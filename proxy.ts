import { NextResponse, type NextRequest } from "next/server";
import { copyProxyCookies, createSupabaseProxyClient } from "@/lib/supabase/server";

const protectedPrefixes = ["/dashboard", "/profile", "/progress", "/admin"];

function preventCaching(response: NextResponse) {
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  return response;
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const requiresAuth = protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
  if (!requiresAuth) return NextResponse.next({ request });

  const supabaseContext = createSupabaseProxyClient(request);
  if (!supabaseContext) {
    const destination = request.nextUrl.clone();
    destination.pathname = "/login";
    destination.searchParams.set("notice", "auth-unavailable");
    destination.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
    return preventCaching(NextResponse.redirect(destination));
  }

  const { client, getResponse } = supabaseContext;
  const { data, error } = await client.auth.getClaims();
  const claims = data?.claims;
  if (error || !claims?.sub) {
    const destination = request.nextUrl.clone();
    destination.pathname = "/login";
    destination.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
    return preventCaching(copyProxyCookies(getResponse(), NextResponse.redirect(destination)));
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const { data: profile, error: profileError } = await client
      .from("profiles")
      .select("role")
      .eq("id", claims.sub)
      .maybeSingle();

    if (profileError || profile?.role !== "admin") {
      const destination = request.nextUrl.clone();
      destination.pathname = "/dashboard";
      destination.search = "";
      return preventCaching(copyProxyCookies(getResponse(), NextResponse.redirect(destination)));
    }
  }

  return preventCaching(getResponse());
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/progress/:path*", "/admin/:path*"]
};

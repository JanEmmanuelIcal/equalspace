import { NextResponse, type NextRequest } from "next/server";
import { copyProxyCookies, createSupabaseProxyClient } from "@/lib/supabase/server";

const protectedPrefixes = ["/dashboard", "/profile", "/progress", "/admin"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const requiresAuth = protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
  if (!requiresAuth) return NextResponse.next({ request });

  const supabaseContext = createSupabaseProxyClient(request);
  if (!supabaseContext) {
    if (!pathname.startsWith("/admin")) return NextResponse.next({ request });
    const destination = request.nextUrl.clone();
    destination.pathname = "/login";
    destination.searchParams.set("notice", "auth-unavailable");
    return NextResponse.redirect(destination);
  }

  const { client, getResponse } = supabaseContext;
  const { data, error } = await client.auth.getClaims();
  const claims = data?.claims;
  if (error || !claims?.sub) {
    const destination = request.nextUrl.clone();
    destination.pathname = "/login";
    destination.searchParams.set("next", pathname);
    return copyProxyCookies(getResponse(), NextResponse.redirect(destination));
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
      return copyProxyCookies(getResponse(), NextResponse.redirect(destination));
    }
  }

  return getResponse();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/progress/:path*", "/admin/:path*"]
};

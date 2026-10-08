import { EmailOtpForm } from "@/components/email-otp-form";

export const metadata = {
  title: "Create account | EqualSpace",
  description: "Create an EqualSpace account and confirm your email with a one-time code."
};

export default function RegisterPage() {
  return <EmailOtpForm />;
}

import { ForgotPasswordForm } from "@/components/forgot-password-form";

export const metadata = {
  title: "Reset password | EqualSpace",
  description: "Recover access to your EqualSpace account with a secure reset link."
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}

import { BackToHome } from "@/components";
import Link from "next/link";

export const metadata = {
  title: "Login - TrueMilk",
  description: "Sign in to your account",
};

export default function LoginPage() {
  return (
    <div className="space-y-8">
      <BackToHome />

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 text-lg">Sign in to your account</p>
          </div>

          <p className="text-gray-600">Login functionality coming soon...</p>

          <div className="space-y-4">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center w-full px-5 py-2.5 text-base font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Create Account Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import { SignUpForm } from "../components/SignUpForm";
import { BackToHome, LoadingCard } from "@/components";
import { Suspense } from "react";

export const metadata = {
  title: "Sign Up - TrueMilk",
  description: "Create your account to start shopping",
};

export default function SignUpPage() {
  return (
    <div className="space-y-8">
      <BackToHome />

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <Suspense fallback={<LoadingCard />}>
          <SignUpForm />
        </Suspense>
      </div>
    </div>
  );
}

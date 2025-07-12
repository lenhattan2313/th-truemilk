"use client";

import { Button, FormField, SuccessCard } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp } from "../hooks/useSignUp";

export function SignUpForm() {
  const router = useRouter();
  const {
    formData,
    errors,
    isLoading,
    isSuccess,
    handleInputChange,
    handleSubmit,
  } = useSignUp();

  const handleRedirect = () => {
    router.push("/login?message=Account created successfully");
  };

  if (isSuccess) {
    return (
      <SuccessCard
        title="Account Created!"
        message="Your account has been created successfully. You'll be redirected to the login page shortly."
        onRedirect={handleRedirect}
        redirectDelay={3000}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-gray-600">Join us and start shopping</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          </div>
        )}

        <FormField
          name="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          isRequired
          disabled={isLoading}
        />

        <FormField
          name="password"
          type="password"
          label="Password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          helpText="Must be at least 8 characters with uppercase, lowercase, and number"
          isRequired
          disabled={isLoading}
        />

        <FormField
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          isRequired
          disabled={isLoading}
        />

        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Creating Account..."
          fullWidth
          size="lg"
        >
          Create Account
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            Already have an account?
          </span>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/login"
          className="text-blue-600 hover:text-blue-500 font-medium transition-colors duration-200"
        >
          Sign in to your account
        </Link>
      </div>
    </div>
  );
}

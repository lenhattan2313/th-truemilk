import { signUpSchema, type SignUpFormData } from "@/lib/validations/auth";
import { useState } from "react";
import { type ZodIssue } from "zod";

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

interface UseSignUpReturn {
  formData: SignUpFormData;
  errors: FormErrors;
  isLoading: boolean;
  isSuccess: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearError: (field: keyof FormErrors) => void;
}

export function useSignUp(): UseSignUpReturn {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Validate form data
      const validationResult = signUpSchema.safeParse(formData);
      if (!validationResult.success) {
        const fieldErrors: FormErrors = {};
        validationResult.error.issues.forEach((issue: ZodIssue) => {
          const fieldName = issue.path[0] as keyof FormErrors;
          fieldErrors[fieldName] = issue.message;
        });
        setErrors(fieldErrors);
        return;
      }

      // Submit to API
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validationResult.data),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          // Handle validation errors from API
          const apiErrors: FormErrors = {};
          Object.keys(data.errors).forEach((key) => {
            if (key in data.errors && data.errors[key]._errors) {
              apiErrors[key as keyof FormErrors] = data.errors[key]._errors[0];
            }
          });
          setErrors(apiErrors);
        } else {
          setErrors({ general: data.message || "Something went wrong" });
        }
        return;
      }

      // Success
      setIsSuccess(true);
    } catch (error) {
      console.error("Sign-up error:", error);
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    isSuccess,
    handleInputChange,
    handleSubmit,
    clearError,
  };
}

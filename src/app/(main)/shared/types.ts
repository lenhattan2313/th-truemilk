export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
  };
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthError {
  field?: string;
  message: string;
}

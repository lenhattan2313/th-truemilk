interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?:
    | "primary"
    | "secondary"
    | "white"
    | "gray"
    | "success"
    | "warning"
    | "error";
  className?: string;
}

const sizeClasses = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

const variantClasses = {
  primary: "border-blue-600",
  secondary: "border-purple-600",
  white: "border-white",
  gray: "border-gray-600",
  success: "border-green-600",
  warning: "border-yellow-600",
  error: "border-red-600",
};

export function LoadingSpinner({
  size = "md",
  variant = "primary",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`
        animate-spin rounded-full border-2 border-t-transparent
        ${sizeClasses[size]} 
        ${variantClasses[variant]}
        ${className}
      `}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

interface LoadingCardProps {
  title?: string;
  subtitle?: string;
  rows?: number;
}

export function LoadingCard({ title, subtitle, rows = 4 }: LoadingCardProps) {
  return (
    <div className="space-y-6">
      <div className="animate-pulse space-y-4">
        {title && (
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
            {subtitle && (
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            )}
          </div>
        )}

        <div className="space-y-4">
          {Array.from({ length: rows }, (_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

export function LoadingButton({
  isLoading,
  children,
  loadingText = "Loading...",
  size = "sm",
  className = "",
}: LoadingButtonProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {isLoading ? (
        <>
          <LoadingSpinner size={size} variant="white" className="mr-2" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </div>
  );
}

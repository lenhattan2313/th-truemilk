"use client";

import { useEffect, useState } from "react";

type AlertVariant = "success" | "error" | "warning" | "info";

interface AlertCardProps {
  variant: AlertVariant;
  title: string;
  message: string;
  redirectPath?: string;
  redirectDelay?: number;
  onRedirect?: () => void;
  showIcon?: boolean;
  className?: string;
}

const variantStyles = {
  success: {
    container: "bg-green-50 border-green-200",
    icon: "bg-green-100 text-green-600",
    title: "text-green-900",
    message: "text-green-700",
    progress: "bg-green-600",
  },
  error: {
    container: "bg-red-50 border-red-200",
    icon: "bg-red-100 text-red-600",
    title: "text-red-900",
    message: "text-red-700",
    progress: "bg-red-600",
  },
  warning: {
    container: "bg-yellow-50 border-yellow-200",
    icon: "bg-yellow-100 text-yellow-600",
    title: "text-yellow-900",
    message: "text-yellow-700",
    progress: "bg-yellow-600",
  },
  info: {
    container: "bg-blue-50 border-blue-200",
    icon: "bg-blue-100 text-blue-600",
    title: "text-blue-900",
    message: "text-blue-700",
    progress: "bg-blue-600",
  },
};

const icons = {
  success: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  ),
  error: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  ),
  warning: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"
    />
  ),
  info: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
};

export function AlertCard({
  variant,
  title,
  message,
  redirectPath,
  redirectDelay = 3000,
  onRedirect,
  showIcon = true,
  className = "",
}: AlertCardProps) {
  const [countdown, setCountdown] = useState(Math.ceil(redirectDelay / 1000));
  const styles = variantStyles[variant];

  useEffect(() => {
    if (!redirectPath && !onRedirect) return;

    const timer = setTimeout(() => {
      if (onRedirect) {
        onRedirect();
      } else if (redirectPath) {
        window.location.href = redirectPath;
      }
    }, redirectDelay);

    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
    };
  }, [redirectPath, redirectDelay, onRedirect]);

  return (
    <div className={`border rounded-lg p-6 ${styles.container} ${className}`}>
      <div className="text-center space-y-4">
        {showIcon && (
          <div
            className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${styles.icon}`}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {icons[variant]}
            </svg>
          </div>
        )}

        <div className="space-y-2">
          <h3 className={`text-xl font-bold ${styles.title}`}>{title}</h3>
          <p className={`${styles.message}`}>{message}</p>
        </div>

        {(redirectPath || onRedirect) && (
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <div
                className={`animate-spin rounded-full h-4 w-4 border-2 border-t-transparent ${styles.progress}`}
              ></div>
              <span className="text-sm text-gray-600">
                Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}...
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className={`h-1 rounded-full transition-all duration-1000 ease-linear ${styles.progress}`}
                style={{
                  width: `${
                    ((Math.ceil(redirectDelay / 1000) - countdown) /
                      Math.ceil(redirectDelay / 1000)) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Convenience components for specific use cases
export function SuccessCard(props: Omit<AlertCardProps, "variant">) {
  return <AlertCard {...props} variant="success" />;
}

export function ErrorCard(props: Omit<AlertCardProps, "variant">) {
  return <AlertCard {...props} variant="error" />;
}

export function WarningCard(props: Omit<AlertCardProps, "variant">) {
  return <AlertCard {...props} variant="warning" />;
}

export function InfoCard(props: Omit<AlertCardProps, "variant">) {
  return <AlertCard {...props} variant="info" />;
}

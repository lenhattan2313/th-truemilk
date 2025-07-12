import Link from "next/link";

interface BackLinkProps {
  href: string;
  label?: string;
  className?: string;
  showIcon?: boolean;
}

export function BackLink({
  href,
  label = "Back",
  className = "",
  showIcon = true,
}: BackLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 ${className}`}
    >
      {showIcon && (
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      )}
      {label}
    </Link>
  );
}

// Convenience components for common use cases
export function BackToHome(props: Omit<BackLinkProps, "href" | "label">) {
  return <BackLink {...props} href="/" label="Back to Home" />;
}

export function BackToProducts(props: Omit<BackLinkProps, "href" | "label">) {
  return <BackLink {...props} href="/products" label="Back to Products" />;
}

export function BackToLogin(props: Omit<BackLinkProps, "href" | "label">) {
  return <BackLink {...props} href="/login" label="Back to Login" />;
}

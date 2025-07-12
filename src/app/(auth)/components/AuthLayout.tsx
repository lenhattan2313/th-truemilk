import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="space-y-8">
      {(title || subtitle) && (
        <div className="text-center">
          {title && (
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          )}
          {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        {children}
      </div>
    </div>
  );
}

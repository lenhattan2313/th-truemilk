import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputVariant = "default" | "filled" | "outline" | "underline";
type InputSize = "sm" | "md" | "lg";

interface BaseFormFieldProps {
  label: string;
  error?: string;
  helpText?: string;
  isRequired?: boolean;
  variant?: InputVariant;
  size?: InputSize;
  fullWidth?: boolean;
}

interface FormFieldProps
  extends BaseFormFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {}

interface TextareaFieldProps
  extends BaseFormFieldProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {}

const variantClasses = {
  default: {
    base: "border border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500",
    error: "border-red-300 focus:border-red-500 focus:ring-red-500",
  },
  filled: {
    base: "border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500",
    error: "bg-red-50 focus:bg-white focus:ring-2 focus:ring-red-500",
  },
  outline: {
    base: "border-2 border-gray-200 bg-transparent focus:border-blue-500 focus:ring-0",
    error: "border-2 border-red-300 focus:border-red-500 focus:ring-0",
  },
  underline: {
    base: "border-0 border-b-2 border-gray-200 bg-transparent rounded-none focus:border-blue-500 focus:ring-0",
    error:
      "border-0 border-b-2 border-red-300 rounded-none focus:border-red-500 focus:ring-0",
  },
};

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2",
  lg: "px-4 py-3 text-lg",
};

function getFieldClasses(
  variant: InputVariant,
  size: InputSize,
  fullWidth: boolean,
  error: boolean,
  className: string
) {
  const variantClass = error
    ? variantClasses[variant].error
    : variantClasses[variant].base;
  const sizeClass = sizeClasses[size];
  const widthClass = fullWidth ? "w-full" : "";

  return `
    ${widthClass} ${sizeClass} ${variantClass}
    rounded-lg shadow-sm
    focus:outline-none focus:ring-2
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    transition-colors duration-200
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");
}

function FieldError({ error, errorId }: { error: string; errorId: string }) {
  return (
    <p id={errorId} className="text-sm text-red-600 flex items-center gap-1">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {error}
    </p>
  );
}

function FieldLabel({
  fieldId,
  label,
  isRequired,
}: {
  fieldId: string;
  label: string;
  isRequired: boolean;
}) {
  return (
    <label
      htmlFor={fieldId}
      className="block text-sm font-medium text-gray-700"
    >
      {label}
      {isRequired && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

function FieldHelp({ helpText, helpId }: { helpText: string; helpId: string }) {
  return (
    <p id={helpId} className="text-xs text-gray-500">
      {helpText}
    </p>
  );
}

// Input FormField Component
export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      error,
      helpText,
      isRequired = false,
      variant = "default",
      size = "md",
      fullWidth = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const fieldId =
      props.id || props.name || label.toLowerCase().replace(/\s+/g, "-");
    const errorId = error ? `${fieldId}-error` : undefined;
    const helpId = helpText ? `${fieldId}-help` : undefined;

    const inputClasses = getFieldClasses(
      variant,
      size,
      fullWidth,
      !!error,
      className
    );

    return (
      <div className="space-y-2">
        <FieldLabel fieldId={fieldId} label={label} isRequired={isRequired} />

        <input
          ref={ref}
          id={fieldId}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            [errorId, helpId].filter(Boolean).join(" ") || undefined
          }
          className={inputClasses}
          {...props}
        />

        {error && <FieldError error={error} errorId={errorId!} />}
        {helpText && !error && (
          <FieldHelp helpText={helpText} helpId={helpId!} />
        )}
      </div>
    );
  }
);

// Textarea FormField Component
export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(
  (
    {
      label,
      error,
      helpText,
      isRequired = false,
      variant = "default",
      size = "md",
      fullWidth = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const fieldId =
      props.id || props.name || label.toLowerCase().replace(/\s+/g, "-");
    const errorId = error ? `${fieldId}-error` : undefined;
    const helpId = helpText ? `${fieldId}-help` : undefined;

    const textareaClasses = getFieldClasses(
      variant,
      size,
      fullWidth,
      !!error,
      className
    );

    return (
      <div className="space-y-2">
        <FieldLabel fieldId={fieldId} label={label} isRequired={isRequired} />

        <textarea
          ref={ref}
          id={fieldId}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            [errorId, helpId].filter(Boolean).join(" ") || undefined
          }
          className={textareaClasses}
          {...props}
        />

        {error && <FieldError error={error} errorId={errorId!} />}
        {helpText && !error && (
          <FieldHelp helpText={helpText} helpId={helpId!} />
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
TextareaField.displayName = "TextareaField";

// Convenience components for specific input types
export const EmailField = forwardRef<
  HTMLInputElement,
  Omit<FormFieldProps, "type">
>((props, ref) => <FormField ref={ref} type="email" {...props} />);

export const PasswordField = forwardRef<
  HTMLInputElement,
  Omit<FormFieldProps, "type">
>((props, ref) => <FormField ref={ref} type="password" {...props} />);

export const NumberField = forwardRef<
  HTMLInputElement,
  Omit<FormFieldProps, "type">
>((props, ref) => <FormField ref={ref} type="number" {...props} />);

EmailField.displayName = "EmailField";
PasswordField.displayName = "PasswordField";
NumberField.displayName = "NumberField";

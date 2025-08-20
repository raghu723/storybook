import React, { useState } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  type?: "text" | "password";
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled: "bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500",
  outlined: "border border-gray-300 dark:border-gray-600 focus:border-blue-500",
  ghost: "bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500",
};

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  loading,
  type = "text",
}) => {
  const [inputType, setInputType] = useState(type);

  const showClear = value && value.length > 0 && !disabled && !loading;
  const isPassword = type === "password";

  return (
    <div className="flex flex-col w-full space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors duration-200">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          aria-describedby={errorMessage ? `${label}-error` : undefined}
          className={`w-full rounded-md focus:outline-none transition-colors duration-200 pr-10
            ${sizeClasses[size]} ${variantClasses[variant]}
            ${disabled ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed" : ""}
            ${invalid ? "border-red-500 dark:border-red-400" : ""}
          `}
        />

        {/* Loading spinner */}
        {loading && (
          <div className="absolute right-2 animate-spin border-2 border-gray-400 border-t-transparent rounded-full w-4 h-4"></div>
        )}

        {/* Clear button */}
        {showClear && !isPassword && (
          <button
            type="button"
            onClick={(e) =>
              onChange?.({ ...e, target: { value: "" } } as any)
            }
            className="absolute right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
            aria-label="Clear input"
          >
            ✕
          </button>
        )}

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() =>
              setInputType(inputType === "password" ? "text" : "password")
            }
            className="absolute right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
            aria-label="Toggle password visibility"
          >
            {inputType === "password" ? "👁️" : "🙈"}
          </button>
        )}
      </div>

      {helperText && !errorMessage && (
        <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
          {helperText}
        </p>
      )}
      {errorMessage && (
        <p
          id={`${label}-error`}
          className="text-xs text-red-500 dark:text-red-400 transition-colors duration-200"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;



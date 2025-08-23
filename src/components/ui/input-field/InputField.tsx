'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  clearable?: boolean;
  passwordToggle?: boolean;
  loading?: boolean;
}

const variantClasses: Record<NonNullable<InputFieldProps['variant']>, string> = {
  filled:
    'bg-gray-100 dark:bg-gray-800 border border-transparent focus:bg-white dark:focus:bg-gray-900 focus:border-gray-300',
  outlined:
    'bg-transparent border border-gray-300 dark:border-gray-700 focus:border-gray-500',
  ghost:
    'bg-transparent border border-transparent hover:border-gray-300 dark:hover:border-gray-700 focus:border-gray-500',
};

const sizeClasses: Record<NonNullable<InputFieldProps['size']>, string> = {
  sm: 'text-sm py-2 px-3',
  md: 'text-base py-2.5 px-3.5',
  lg: 'text-lg py-3 px-4',
};

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      className,
      variant = 'outlined',
      size = 'md',
      disabled,
      invalid,
      clearable,
      passwordToggle,
      loading,
      type = 'text',
      value,
      onChange,
      id,
      placeholder,
      ...props
    },
    ref
  ) => {
    const autoId = React.useId();
    const inputId = id ?? autoId;
    const [localType, setLocalType] = React.useState(type);
    React.useEffect(() => setLocalType(type), [type]);

    const showError = Boolean(invalid && errorMessage);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            aria-invalid={invalid ? true : undefined}
            aria-describedby={
              showError ? `${inputId}-error` : helperText ? `${inputId}-help` : undefined
            }
            disabled={disabled || loading}
            type={localType}
            className={cn(
              'w-full rounded-lg transition outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500',
              variantClasses[variant],
              sizeClasses[size],
              disabled && 'opacity-60 cursor-not-allowed',
              loading && 'pr-10',
              showError && 'ring-1 ring-red-500 border-red-500',
              className
            )}
            {...props}
          />

          {clearable && value && !disabled && !loading && (
            <button
              type="button"
              aria-label="Clear input"
              onClick={() =>
                onChange?.({
                  target: { value: '' },
                } as unknown as React.ChangeEvent<HTMLInputElement>)
              }
              className="absolute inset-y-0 right-2 my-auto h-7 w-7 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              ×
            </button>
          )}

          {passwordToggle && type === 'password' && (
            <button
              type="button"
              aria-label={localType === 'password' ? 'Show password' : 'Hide password'}
              onClick={() => setLocalType((t) => (t === 'password' ? 'text' : 'password'))}
              className="absolute inset-y-0 right-2 my-auto h-7 px-2 rounded-md text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {localType === 'password' ? 'Show' : 'Hide'}
            </button>
          )}

          {loading && (
            <div
              aria-label="Loading"
              className="absolute inset-y-0 right-2 my-auto h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-transparent"
            />
          )}
        </div>

        {helperText && !showError && (
          <p id={`${inputId}-help`} className="mt-1 text-xs text-gray-500">
            {helperText}
          </p>
        )}
        {showError && (
          <p id={`${inputId}-error`} role="alert" className="mt-1 text-xs text-red-600">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
export default InputField;
export { InputField };

import { cn } from '@/utils/classname';
import React, { forwardRef, useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

type InputBaseProps = {
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'file' | 'textarea';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  baseClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  label?: string;
  id?: string;
  value?: string;
  defaultValue?: string;
  rows?: number;
  accept?: string;
  name?: string;
  error?: string;
  forgotPassword?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

const TextField = forwardRef<HTMLInputElement, InputBaseProps>(
  (
    {
      placeholder,
      type = 'text',
      startIcon,
      endIcon,
      baseClassName,
      inputClassName,
      onChange,
      disabled,
      label,
      id,
      value,
      defaultValue,
      rows,
      labelClassName,
      accept,
      error,
      name,
      forgotPassword,
      ...props
    },
    ref
  ) => {
    const [file, setFile] = useState<File | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const renderInput = () => {
      if (type === 'file') {
        return (
          <>
            <button
              className={cn(
                'w-full py-3 pr-4 rounded-lg border-2 transition-colors duration-300 bg-white text-gray-950 max-h-[48px] text-start',
                !startIcon ? 'pl-4' : endIcon && !startIcon ? 'pl-4' : 'pl-10',
                error ? 'border-red-500' : 'border-gray-100 focus:border-purple-500',
                inputClassName,
                file ? 'text-gray-950' : 'text-gray-400'
              )}
              disabled={disabled}
              onClick={() => document.getElementById(id || 'file')?.click()}
              type="button"
            >
              {file?.name || placeholder || 'Choose File'}
            </button>
            <input
              type="file"
              className="hidden"
              id={id || 'file'}
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) {
                  setFile(selectedFile);
                  onChange?.(e as React.ChangeEvent<HTMLInputElement>);
                }
              }}
              accept={accept}
              name={name}
              ref={ref}
              {...props}
            />
          </>
        );
      }

      if (type === 'textarea') {
        return (
          <textarea
            className={cn(
              'w-full py-3 pr-4 rounded-lg focus:outline-none border-2 transition-colors duration-300 bg-white text-gray-950',
              !startIcon ? 'pl-4' : endIcon && !startIcon ? 'pl-4' : 'pl-10',
              error ? 'border-red-500' : 'border-gray-100 focus:border-purple-500',
              inputClassName,
              'max-h-none'
            )}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            id={id}
            value={value}
            defaultValue={defaultValue}
            rows={rows}
            name={name}
          />
        );
      }

      const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

      return (
        <input
          type={inputType}
          className={cn(
            'w-full py-3 rounded-lg focus:outline-none border-2 transition-colors duration-300 bg-white text-gray-950 max-h-[48px]',
            !startIcon ? 'pl-4' : endIcon && !startIcon ? 'pl-4' : 'pl-10',
            type === 'password' ? 'pr-12' : 'pr-4',
            error ? 'border-red-500' : 'border-gray-100 focus:border-purple-500',
            inputClassName
          )}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          id={id}
          value={value}
          defaultValue={defaultValue}
          name={name}
          ref={ref}
          {...props}
        />
      );
    };

    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {label && (
            <label className={cn('text-zinc-800 text-sm font-medium', labelClassName)} htmlFor={id}>
              {label}
            </label>
          )}
          {forgotPassword && type === 'password' && (
            <Link href="/auth/forgot-password" className="text-blue-500 text-sm font-normal">
              Forgot Password ?
            </Link>
          )}
        </div>
        <div className={cn('relative w-full', baseClassName)}>
          {renderInput()}
          {startIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {startIcon}
            </div>
          )}
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
            >
              <Icon icon={showPassword ? 'lucide:eye-off' : 'akar-icons:eye'} className="size-5" />
            </button>
          )}
          {endIcon && type !== 'password' && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {endIcon}
            </div>
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;

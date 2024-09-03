'use client';

import React, { ReactNode, ButtonHTMLAttributes, useState, useTransition } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outlined' | 'filled';
  children: ReactNode;
  onClick?: () => void;
  width?: string;
  height?: string;
  loading?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  children,
  onClick,
  width,
  height,
  loading,
  className,
  ...props
}) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (onClick) {
      startTransition(onClick);
    }
  };

  const baseClasses =
    'rounded-full font-medium text-lg shadow-[2px_2px_0_0_#000] transition-all duration-75 ease-in flex items-center justify-center';

  const variantClasses = {
    filled:
      'bg-[--brand-primary] hover:bg-pink-500 border border-black active:shadow-none disabled:bg-slate-500 text-white',
    outlined:
      'border border-black bg-white hover:bg-gray-200 active:shadow-none text-black',
  };

  return (
    <button
      type="button"
      className={clsx(
        baseClasses,
        variantClasses[variant],
        width ? `w-${width}` : '',
        height ? `h-${height}` : '',
        loading || isPending ? 'cursor-not-allowed' : '',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {loading || isPending ? (
        <FaSpinner className="animate-spin mr-2" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
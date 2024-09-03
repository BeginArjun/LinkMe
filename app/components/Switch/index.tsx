import React from 'react';
import clsx from 'clsx';

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  checked: boolean;
  onChange: (e : React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large' | undefined;
  onColor?: string;
  offColor?: string;
  knobColor?: string;
}

const sizeClasses = {
  small: 'w-8 h-4',
  medium: 'w-12 h-6',
  large: 'w-16 h-8',
};

const knobSizeClasses = {
  small: 'w-4 h-4',
  medium: 'w-6 h-6',
  large: 'w-8 h-8',
};

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  size = 'medium',
  onColor = 'bg-green-500',
  offColor = 'bg-gray-300',
  knobColor = 'bg-white',
  ...props
}) => {
  const id = React.useId();

  return (
    <div className="relative inline-block">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
        name='visible'
      />
      <label
        htmlFor={id}
        className={clsx(
          'relative inline-flex items-center cursor-pointer transition-colors ease-in-out duration-300 rounded-full',
          sizeClasses[size],
          checked ? onColor : offColor,
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <div
          className={clsx(
            'absolute rounded-full transition-transform transform ease-in-out duration-300',
            knobSizeClasses[size],
            checked ? 'translate-x-full' : 'translate-x-0',
            knobColor
          )}
        />
      </label>
    </div>
  );
};

export default Switch;

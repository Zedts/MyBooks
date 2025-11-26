import React, { InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff, Mail, User, Lock, Phone, UserCircle } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: 'email' | 'user' | 'password' | 'phone' | 'userCircle' | 'none';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  type = 'text',
  icon = 'none',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const inputType = isPasswordField && showPassword ? 'text' : type;

  // Icon mapping
  const IconComponent = {
    email: Mail,
    user: User,
    password: Lock,
    phone: Phone,
    userCircle: UserCircle,
    none: null,
  }[icon];

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {IconComponent && (
          <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
        )}
        <input
          type={inputType}
          className={`
            w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
            text-white placeholder-neutral-500
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
            transition-all duration-300
            ${IconComponent ? 'pl-11' : ''}
            ${isPasswordField ? 'pr-11' : ''}
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

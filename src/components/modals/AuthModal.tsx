'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Chrome, Github } from 'lucide-react';
import { validateEmail, validatePassword, validateUsername, validatePhone } from '../../utils/validators';
import { showErrorToast, showSuccessToast } from '../../utils/toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'login',
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({});

  // Register form state
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerFullName, setRegisterFullName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerErrors, setRegisterErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    phone?: string;
  }>({});

  // Reset form when changing tabs
  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab);
    setLoginEmail('');
    setLoginPassword('');
    setRegisterUsername('');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterFullName('');
    setRegisterPhone('');
    setLoginErrors({});
    setRegisterErrors({});
  };

  // Reset form when tab prop changes
  React.useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  // Login validation
  const validateLoginForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};

    if (!loginEmail) {
      errors.email = 'Email is required';
    } else if (!validateEmail(loginEmail)) {
      errors.email = 'Invalid email format';
    }

    if (!loginPassword) {
      errors.password = 'Password is required';
    }

    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Register validation
  const validateRegisterForm = (): boolean => {
    const errors: { username?: string; email?: string; password?: string; phone?: string } = {};

    const usernameValidation = validateUsername(registerUsername);
    if (!registerUsername) {
      errors.username = 'Username is required';
    } else if (!usernameValidation.isValid) {
      errors.username = usernameValidation.message;
    }

    if (!registerEmail) {
      errors.email = 'Email is required';
    } else if (!validateEmail(registerEmail)) {
      errors.email = 'Invalid email format';
    }

    const passwordValidation = validatePassword(registerPassword);
    if (!registerPassword) {
      errors.password = 'Password is required';
    } else if (!passwordValidation.isValid) {
      errors.password = passwordValidation.message;
    }

    // Phone is optional, but validate if provided
    if (registerPhone && !validatePhone(registerPhone)) {
      errors.phone = 'Invalid phone number format';
    }

    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle login submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLoginForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // CRITICAL: Required to receive httpOnly cookies
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await response.json();

      if (data.success) {
        
        // Store token ONLY in localStorage (cookie already set by API via Set-Cookie header)
        localStorage.setItem('auth_token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        // Determine redirect path
        const redirectPath = data.data.user.role === 'admin' ? '/pages/admin/home' : '/pages/user/home';
        
        // Show success toast
        showSuccessToast('Login successful! Redirecting...');
        
        // Use router.push (Next.js navigation) - respects middleware and cookie state
        // Short delay to ensure cookie is set and toast is visible
        setTimeout(() => {
          router.push(redirectPath);
        }, 500);
      } else {
        console.error('❌ Login failed:', data.error);
        showErrorToast(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('❌ Exception during login:', error);
      showErrorToast('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle register submit
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateRegisterForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // CRITICAL: Required to receive httpOnly cookies
        body: JSON.stringify({
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
          full_name: registerFullName || undefined,
          phone: registerPhone || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store token ONLY in localStorage (cookie already set by API via Set-Cookie header)
        localStorage.setItem('auth_token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        // Determine redirect path
        const redirectPath = data.data.user.role === 'admin' ? '/pages/admin/home' : '/pages/user/home';
        
        // Show success toast
        showSuccessToast('Account created! Redirecting...');
        
        // Use router.push (Next.js navigation) - respects middleware and cookie state
        setTimeout(() => {
          router.push(redirectPath);
        }, 500);
      } else {
        showErrorToast(data.error || 'Registration failed');
      }
    } catch {
      showErrorToast('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md" disableBackdropClick={isLoading}>
      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-6">
        <button
          onClick={() => handleTabChange('login')}
          className={`flex-1 py-3 text-center font-medium transition-colors relative ${
            activeTab === 'login'
              ? 'text-white'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          Login
          {activeTab === 'login' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
          )}
        </button>
        <button
          onClick={() => handleTabChange('register')}
          className={`flex-1 py-3 text-center font-medium transition-colors relative ${
            activeTab === 'register'
              ? 'text-white'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          Register
          {activeTab === 'register' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
          )}
        </button>
      </div>

      {/* Login Form */}
      {activeTab === 'login' && (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            icon="email"
            placeholder="Enter your email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            error={loginErrors.email}
          />

          <Input
            label="Password"
            type="password"
            icon="password"
            placeholder="Enter your password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            error={loginErrors.password}
          />

          {/* Forgot Password */}
          <div className="flex items-center justify-start">
            <button
              type="button"
              className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            loadingText="Signing in..."
            className="w-full"
          >
            Sign In
          </Button>

          {/* OR Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-neutral-900/95 text-neutral-500">OR</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 cursor-pointer"
            >
              <Chrome className="w-5 h-5" />
              Continue with Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 cursor-pointer"
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </button>
          </div>
        </form>
      )}

      {/* Register Form */}
      {activeTab === 'register' && (
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <Input
            label="Username"
            type="text"
            icon="user"
            placeholder="Choose a username"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
            error={registerErrors.username}
          />

          <Input
            label="Email"
            type="email"
            icon="email"
            placeholder="Enter your email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            error={registerErrors.email}
          />

          <Input
            label="Password"
            type="password"
            icon="password"
            placeholder="Create a password (min. 8 characters)"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            error={registerErrors.password}
          />

          <Input
            label="Full Name (Optional)"
            type="text"
            icon="userCircle"
            placeholder="Enter your full name"
            value={registerFullName}
            onChange={(e) => setRegisterFullName(e.target.value)}
          />

          <Input
            label="Phone Number (Optional)"
            type="tel"
            icon="phone"
            placeholder="Enter your phone number"
            value={registerPhone}
            onChange={(e) => setRegisterPhone(e.target.value)}
            error={registerErrors.phone}
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            loadingText="Creating account..."
            className="w-full"
          >
            Create Account
          </Button>

          {/* OR Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-neutral-900/95 text-neutral-500">OR</span>
            </div>
          </div>

          {/* Social Register Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 cursor-pointer"
            >
              <Chrome className="w-5 h-5" />
              Continue with Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 cursor-pointer"
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

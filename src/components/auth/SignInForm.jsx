import { useState } from 'react';
import {
  clearRememberedEmail,
  getRememberedEmail,
  setRememberedEmail,
} from '../../utils/storage.js';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import AuthCard from './AuthCard.jsx';
import AuthDivider from './AuthDivider.jsx';
import SocialLogin from './SocialLogin.jsx';

export default function SignInForm({ onSwitchForm, onForgotPassword, onToast }) {
  const initialEmail = getRememberedEmail();
  const [formData, setFormData] = useState({ email: initialEmail, password: '' });
  const [rememberEmail, setRememberEmail] = useState(Boolean(initialEmail));
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: '' }));
  }

  function handleRememberToggle(event) {
    const { checked } = event.target;
    setRememberEmail(checked);
    if (!checked) {
      clearRememberedEmail();
    }
  }

  function validateForm() {
    const nextErrors = {};
    if (!formData.email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) nextErrors.email = 'Enter a valid email.';
    if (!formData.password) nextErrors.password = 'Password is required.';
    else if (formData.password.length < 6) nextErrors.password = 'Use at least 6 characters.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 900));
      if (rememberEmail) {
        setRememberedEmail(formData.email);
      } else {
        clearRememberedEmail();
      }
      setFormData((previous) => ({ ...previous, password: '' }));
      onToast?.({
        variant: 'success',
        title: 'Signed in',
        message: 'Login demonstrativo realizado. Nenhum dado foi enviado.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard title="Welcome Back" subtitle="Sign in to continue your journey">
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
        <div className="flex flex-col gap-3">
          <Input
            id="signin-email"
            name="email"
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            id="signin-password"
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
        </div>
        <div className="flex items-center justify-between text-[12px] text-auth-slate light:text-slate-600">
          <label className="flex cursor-pointer items-center gap-2 select-none">
            <input
              type="checkbox"
              checked={rememberEmail}
              onChange={handleRememberToggle}
              className="accent-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300 light:accent-navy-800 light:focus-visible:outline-navy-800"
            />
            Remember me
          </label>
          <button
            type="button"
            onClick={onForgotPassword}
            className="cursor-pointer rounded-sm text-yellow-400 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300 light:font-medium light:text-navy-800 light:focus-visible:outline-navy-800"
          >
            Forgot password?
          </button>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
      <AuthDivider />
      <SocialLogin onSelect={onToast} />
      <p className="text-center text-[13px] text-auth-slate light:text-slate-600">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onSwitchForm}
          className="cursor-pointer rounded-sm font-semibold text-yellow-400 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300 light:text-navy-800 light:focus-visible:outline-navy-800"
        >
          Sign Up
        </button>
      </p>
    </AuthCard>
  );
}

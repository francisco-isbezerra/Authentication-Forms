import { useState } from 'react';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import PasswordStrength from '../ui/PasswordStrength.jsx';
import AuthCard from './AuthCard.jsx';
import AuthDivider from './AuthDivider.jsx';
import SocialLogin from './SocialLogin.jsx';

const INITIAL_VALUES = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function SignUpForm({ onSwitchForm, onToast }) {
  const [formData, setFormData] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => {
      const next = { ...previous, [name]: '' };
      if (name === 'password' && previous.confirmPassword && value === formData.confirmPassword) {
        next.confirmPassword = '';
      }
      return next;
    });
  }

  function validateForm() {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Full name is required.';
    if (!formData.email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) nextErrors.email = 'Enter a valid email.';
    if (!formData.password) nextErrors.password = 'Password is required.';
    else if (formData.password.length < 6) nextErrors.password = 'Use at least 6 characters.';
    if (!formData.confirmPassword) nextErrors.confirmPassword = 'Please confirm your password.';
    else if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 900));
      setFormData(INITIAL_VALUES);
      onToast?.({
        variant: 'success',
        title: 'Account created',
        message: 'Cadastro demonstrativo realizado. Nenhum dado foi enviado.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard title="Create Account" subtitle="Join our community today">
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
        <div className="flex flex-col gap-3">
          <Input
            id="signup-name"
            name="name"
            label="Full Name"
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Input
            id="signup-email"
            name="email"
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <div className="flex flex-col gap-2">
            <Input
              id="signup-password"
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <PasswordStrength password={formData.password} />
          </div>
          <Input
            id="signup-confirm-password"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
      <AuthDivider />
      <SocialLogin onSelect={onToast} />
      <p className="text-center text-[13px] text-auth-slate light:text-slate-600">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchForm}
          className="cursor-pointer rounded-sm font-semibold text-yellow-400 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300 light:text-navy-800 light:focus-visible:outline-navy-800"
        >
          Sign In
        </button>
      </p>
    </AuthCard>
  );
}

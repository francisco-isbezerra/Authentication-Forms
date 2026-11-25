import { useState } from 'react';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import AuthCard from './AuthCard.jsx';

export default function ForgotPasswordForm({ onBackToSignIn, onToast }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sentTo, setSentTo] = useState('');

  function handleChange(event) {
    setEmail(event.target.value);
    setError('');
  }

  function validateForm() {
    if (!email.trim()) {
      setError('Email is required.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email.');
      return false;
    }
    setError('');
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 900));
      const trimmedEmail = email.trim();
      setSentTo(trimmedEmail);
      onToast?.({
        variant: 'success',
        title: 'Reset link sent',
        message: 'Link de recuperação demonstrativo enviado. Nenhum dado foi enviado.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard
      title="Reset Password"
      subtitle="Enter your email to receive recovery instructions"
    >
      {sentTo ? (
        <div
          role="status"
          className="space-y-4 rounded-xl border border-emerald-400/35 bg-emerald-400/10 p-4 text-center text-sm text-emerald-100 light:border-emerald-300 light:bg-emerald-50 light:text-emerald-900"
        >
          <p className="font-semibold">Check your inbox</p>
          <p className="text-xs leading-5 text-auth-slate light:text-emerald-800">
            If an account exists for <strong className="text-white light:text-emerald-950">{sentTo}</strong>, a
            password reset link has been sent.
          </p>
          <Button type="button" onClick={onBackToSignIn}>
            Back to Sign In
          </Button>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
          <Input
            id="forgot-email"
            name="email"
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={handleChange}
            error={error}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending link...' : 'Send Reset Link'}
          </Button>
        </form>
      )}

      <p className="text-center text-[13px] text-auth-slate light:text-slate-600">
        Remembered your password?{' '}
        <button
          type="button"
          onClick={onBackToSignIn}
          className="cursor-pointer rounded-sm font-semibold text-yellow-400 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300 light:text-navy-800 light:focus-visible:outline-navy-800"
        >
          Sign In
        </button>
      </p>
    </AuthCard>
  );
}

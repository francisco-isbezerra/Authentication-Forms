import { useCallback, useEffect, useState } from 'react';
import { getStoredTheme, setStoredTheme } from '../utils/storage.js';
import BackgroundEffects from '../components/layout/BackgroundEffects.jsx';
import AuthBadge from '../components/ui/AuthBadge.jsx';
import ThemeToggle from '../components/ui/ThemeToggle.jsx';
import Toast from '../components/ui/Toast.jsx';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm.jsx';
import SignInForm from '../components/auth/SignInForm.jsx';
import SignUpForm from '../components/auth/SignUpForm.jsx';

const VIEW_LABELS = {
  signup: 'SIGN UP',
  signin: 'SIGN IN',
  forgot: 'RESET PASSWORD',
};

export default function AuthPage() {
  const [view, setView] = useState('signup');
  const [theme, setTheme] = useState(getStoredTheme);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    setStoredTheme(theme);
  }, [theme]);

  const showToast = useCallback((nextToast) => {
    setToast({ id: Date.now(), ...nextToast });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-950 p-4 py-24 transition-colors duration-200 light:bg-slate-100">
      <BackgroundEffects />
      <AuthBadge />

      <div className="absolute right-5 top-5 z-20 flex flex-col items-end gap-2 sm:right-[85px] sm:top-12 sm:flex-row sm:items-center sm:gap-3">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <span className="text-xs font-bold text-auth-slate light:text-slate-600">
          {VIEW_LABELS[view]}
        </span>
      </div>

      <div className="relative z-10">
        {view === 'signup' && (
          <SignUpForm onSwitchForm={() => setView('signin')} onToast={showToast} />
        )}
        {view === 'signin' && (
          <SignInForm
            onSwitchForm={() => setView('signup')}
            onForgotPassword={() => setView('forgot')}
            onToast={showToast}
          />
        )}
        {view === 'forgot' && (
          <ForgotPasswordForm onBackToSignIn={() => setView('signin')} onToast={showToast} />
        )}
      </div>

      <Toast toast={toast} onDismiss={dismissToast} />
    </main>
  );
}

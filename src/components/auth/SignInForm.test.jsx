import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import SignInForm from './SignInForm.jsx';

function setup() {
  const user = userEvent.setup();
  const onSwitchForm = vi.fn();
  const onForgotPassword = vi.fn();
  const onToast = vi.fn();
  render(
    <SignInForm
      onSwitchForm={onSwitchForm}
      onForgotPassword={onForgotPassword}
      onToast={onToast}
    />,
  );

  return {
    user,
    onSwitchForm,
    onForgotPassword,
    onToast,
    email: screen.getByLabelText('Email Address'),
    password: screen.getByLabelText('Password'),
    remember: screen.getByRole('checkbox', { name: 'Remember me' }),
    forgot: screen.getByRole('button', { name: 'Forgot password?' }),
    submit: screen.getByRole('button', { name: 'Sign In' }),
  };
}

describe('SignInForm', () => {
  it('preenche o e-mail salvo no localStorage e marca Remember me', () => {
    localStorage.setItem('auth-forms:remembered-email', 'salvo@exemplo.com');
    const { email, remember } = setup();

    expect(email).toHaveValue('salvo@exemplo.com');
    expect(remember).toBeChecked();
  });

  it('valida campos obrigatórios e alterna visibilidade da senha', async () => {
    const { user, email, password, submit, onToast } = setup();

    await user.click(screen.getByRole('button', { name: 'Show password' }));
    expect(password).toHaveAttribute('type', 'text');

    await user.click(submit);
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Password is required.')).toBeInTheDocument();
    expect(email).toHaveAttribute('aria-invalid', 'true');
    expect(onToast).not.toHaveBeenCalled();
  });

  it('salva apenas o e-mail quando Remember me está marcado e remove ao desmarcar', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { user, email, password, remember, submit, onToast } = setup();

    await user.type(email, 'ana@exemplo.com');
    await user.type(password, 'segredo123');
    await user.click(remember);
    await user.click(submit);

    expect(submit).toBeDisabled();
    expect(submit).toHaveTextContent('Signing in...');

    await waitFor(
      () =>
        expect(onToast).toHaveBeenCalledWith({
          variant: 'success',
          title: 'Signed in',
          message: 'Login demonstrativo realizado. Nenhum dado foi enviado.',
        }),
      { timeout: 2000 },
    );

    expect(localStorage.getItem('auth-forms:remembered-email')).toBe('ana@exemplo.com');
    expect(JSON.stringify(localStorage)).not.toContain('segredo123');
    expect(logSpy).not.toHaveBeenCalled();

    await user.click(remember);
    expect(localStorage.getItem('auth-forms:remembered-email')).toBeNull();
  });

  it('aciona Forgot password? ao clicar no link', async () => {
    const { user, forgot, onForgotPassword } = setup();
    await user.click(forgot);
    expect(onForgotPassword).toHaveBeenCalledTimes(1);
  });
});

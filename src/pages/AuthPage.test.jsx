import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import AuthPage from './AuthPage.jsx';

describe('AuthPage', () => {
  it('inicia em Sign Up e navega para Sign In e Reset Password sem recarregar', async () => {
    const user = userEvent.setup();
    render(<AuthPage />);

    expect(screen.getByText('AUTHENTICATION UI')).toBeInTheDocument();
    expect(screen.getByText('SIGN UP')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Create Account' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(screen.getByText('SIGN IN')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Welcome Back' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Forgot password?' }));
    expect(screen.getByText('RESET PASSWORD')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Reset Password' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(screen.getByText('SIGN IN')).toBeInTheDocument();
  });

  it('alterna entre tema escuro e claro mantendo a preferência salva', async () => {
    const user = userEvent.setup();
    render(<AuthPage />);

    expect(document.documentElement.dataset.theme).toBe('dark');
    const toggle = screen.getByRole('button', { name: 'Switch to light theme' });
    await user.click(toggle);

    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem('auth-forms:theme')).toBe('light');
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('exibe toast de feedback ao enviar formulário válido e permite fechar', async () => {
    const user = userEvent.setup();
    render(<AuthPage />);

    await user.type(screen.getByLabelText('Full Name'), 'Maria Silva');
    await user.type(screen.getByLabelText('Email Address'), 'maria@exemplo.com');
    await user.type(screen.getByLabelText('Password'), 'Senha@123');
    await user.type(screen.getByLabelText('Confirm Password'), 'Senha@123');
    await user.click(screen.getByRole('button', { name: 'Create Account' }));

    const status = await screen.findByRole('status', {}, { timeout: 2000 });
    expect(status).toHaveTextContent('Account created');
    expect(status).toHaveTextContent('Cadastro demonstrativo realizado. Nenhum dado foi enviado.');

    await user.click(screen.getByRole('button', { name: 'Close notification' }));
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  });

  it('exibe toast informativo ao clicar nos botões sociais', async () => {
    const user = userEvent.setup();
    render(<AuthPage />);

    await user.click(screen.getByRole('button', { name: 'Continue with Google' }));
    const status = await screen.findByRole('status');
    expect(status).toHaveTextContent('Google sign-in');
  });
});

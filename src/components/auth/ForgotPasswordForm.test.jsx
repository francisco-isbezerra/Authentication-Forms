import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ForgotPasswordForm from './ForgotPasswordForm.jsx';

describe('ForgotPasswordForm', () => {
  it('valida o e-mail antes de enviar', async () => {
    const user = userEvent.setup();
    const onToast = vi.fn();
    render(<ForgotPasswordForm onBackToSignIn={vi.fn()} onToast={onToast} />);

    await user.click(screen.getByRole('button', { name: 'Send Reset Link' }));
    expect(screen.getByText('Email is required.')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Email Address'), 'invalido');
    await user.click(screen.getByRole('button', { name: 'Send Reset Link' }));
    expect(screen.getByText('Enter a valid email.')).toBeInTheDocument();
    expect(onToast).not.toHaveBeenCalled();
  });

  it('simula envio, exibe confirmação e permite voltar para o login', async () => {
    const user = userEvent.setup();
    const onBackToSignIn = vi.fn();
    const onToast = vi.fn();
    render(<ForgotPasswordForm onBackToSignIn={onBackToSignIn} onToast={onToast} />);

    await user.type(screen.getByLabelText('Email Address'), 'ana@exemplo.com');
    await user.click(screen.getByRole('button', { name: 'Send Reset Link' }));

    expect(screen.getByRole('button', { name: 'Sending link...' })).toBeDisabled();

    expect(await screen.findByText('Check your inbox', {}, { timeout: 2000 })).toBeInTheDocument();
    await waitFor(() =>
      expect(onToast).toHaveBeenCalledWith({
        variant: 'success',
        title: 'Reset link sent',
        message: 'Link de recuperação demonstrativo enviado. Nenhum dado foi enviado.',
      }),
    );

    await user.click(screen.getByRole('button', { name: 'Back to Sign In' }));
    expect(onBackToSignIn).toHaveBeenCalledTimes(1);
  });
});

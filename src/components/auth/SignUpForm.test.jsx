import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import SignUpForm from './SignUpForm.jsx';

function setup() {
  const user = userEvent.setup();
  const onSwitchForm = vi.fn();
  const onToast = vi.fn();
  render(<SignUpForm onSwitchForm={onSwitchForm} onToast={onToast} />);

  return {
    user,
    onSwitchForm,
    onToast,
    name: screen.getByLabelText('Full Name'),
    email: screen.getByLabelText('Email Address'),
    password: screen.getByLabelText('Password'),
    confirmPassword: screen.getByLabelText('Confirm Password'),
    submit: screen.getByRole('button', { name: 'Create Account' }),
  };
}

describe('SignUpForm', () => {
  it('valida campos obrigatórios incluindo Confirm Password', async () => {
    const { user, name, email, password, confirmPassword, submit, onToast } = setup();

    await user.click(submit);

    expect(screen.getByText('Full name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Password is required.')).toBeInTheDocument();
    expect(screen.getByText('Please confirm your password.')).toBeInTheDocument();

    expect(name).toHaveAttribute('aria-invalid', 'true');
    expect(email).toHaveAttribute('aria-invalid', 'true');
    expect(password).toHaveAttribute('aria-invalid', 'true');
    expect(confirmPassword).toHaveAttribute('aria-invalid', 'true');
    expect(confirmPassword).toHaveAttribute('aria-describedby', 'signup-confirm-password-error');
    expect(onToast).not.toHaveBeenCalled();
  });

  it('mostra indicador de força e valida se as senhas coincidem', async () => {
    const { user, name, email, password, confirmPassword, submit } = setup();

    await user.type(name, 'Maria Silva');
    await user.type(email, 'maria@exemplo.com');
    await user.type(password, '123456');
    expect(screen.getByText('Weak')).toBeInTheDocument();

    await user.type(confirmPassword, '654321');
    await user.click(submit);
    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();

    await user.clear(password);
    await user.type(password, 'Senha@123');
    expect(screen.getByText('Strong')).toBeInTheDocument();

    await user.clear(confirmPassword);
    await user.type(confirmPassword, 'Senha@123');
    expect(screen.queryByText('Passwords do not match.')).not.toBeInTheDocument();
  });

  it('alterna mostrar/ocultar senha de forma independente nos dois campos', async () => {
    const { user, password, confirmPassword } = setup();
    const toggles = screen.getAllByRole('button', { name: 'Show password' });
    expect(toggles).toHaveLength(2);

    await user.click(toggles[0]);
    expect(password).toHaveAttribute('type', 'text');
    expect(confirmPassword).toHaveAttribute('type', 'password');

    await user.click(toggles[1]);
    expect(confirmPassword).toHaveAttribute('type', 'text');
  });

  it('entra em loading no envio válido, chama toast de sucesso e não armazena senha', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { user, name, email, password, confirmPassword, submit, onToast } = setup();

    await user.type(name, 'Maria Silva');
    await user.type(email, 'maria@exemplo.com');
    await user.type(password, 'Senha@123');
    await user.type(confirmPassword, 'Senha@123');
    await user.click(submit);

    expect(submit).toBeDisabled();
    expect(submit).toHaveTextContent('Creating account...');

    await waitFor(
      () =>
        expect(onToast).toHaveBeenCalledWith({
          variant: 'success',
          title: 'Account created',
          message: 'Cadastro demonstrativo realizado. Nenhum dado foi enviado.',
        }),
      { timeout: 2000 },
    );

    expect(submit).toBeEnabled();
    expect(localStorage.length).toBe(0);
    expect(logSpy).not.toHaveBeenCalled();
  });
});

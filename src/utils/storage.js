const EMAIL_KEY = 'auth-forms:remembered-email';
const THEME_KEY = 'auth-forms:theme';

/**
 * Armazena apenas o e-mail lembrado (nunca senhas) e a preferência de tema.
 */
export function getRememberedEmail() {
  try {
    return localStorage.getItem(EMAIL_KEY) ?? '';
  } catch {
    return '';
  }
}

export function setRememberedEmail(email) {
  try {
    localStorage.setItem(EMAIL_KEY, email.trim());
  } catch {
    // Ignora falhas de armazenamento em ambientes restritos.
  }
}

export function clearRememberedEmail() {
  try {
    localStorage.removeItem(EMAIL_KEY);
  } catch {
    // Ignora falhas de armazenamento em ambientes restritos.
  }
}

export function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export function setStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Ignora falhas de armazenamento em ambientes restritos.
  }
}

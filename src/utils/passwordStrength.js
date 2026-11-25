export const PASSWORD_CRITERIA = [
  { id: 'length', label: '6+ characters', test: (value) => value.length >= 6 },
  { id: 'upper', label: 'Uppercase', test: (value) => /[A-Z]/.test(value) },
  { id: 'lower', label: 'Lowercase', test: (value) => /[a-z]/.test(value) },
  { id: 'number', label: 'Number', test: (value) => /\d/.test(value) },
  { id: 'special', label: 'Symbol', test: (value) => /[^A-Za-z0-9\s]/.test(value) },
];

export function evaluatePasswordStrength(password = '') {
  if (!password) {
    return { score: 0, label: '', tone: 'none', checks: [] };
  }

  const checks = PASSWORD_CRITERIA.map((rule) => ({
    ...rule,
    met: rule.test(password),
  }));
  const metCount = checks.filter((item) => item.met).length;

  // Senhas abaixo do mínimo de 6 caracteres são sempre consideradas fracas.
  if (password.length < 6 || metCount <= 2) {
    return { score: 1, label: 'Weak', tone: 'weak', checks };
  }
  if (metCount === 3) {
    return { score: 2, label: 'Fair', tone: 'fair', checks };
  }
  if (metCount === 4) {
    return { score: 3, label: 'Good', tone: 'good', checks };
  }
  return { score: 4, label: 'Strong', tone: 'strong', checks };
}

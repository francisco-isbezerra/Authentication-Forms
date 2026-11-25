import { describe, expect, it } from 'vitest';
import { evaluatePasswordStrength } from './passwordStrength.js';

describe('evaluatePasswordStrength', () => {
  it('retorna estado vazio quando não há senha', () => {
    expect(evaluatePasswordStrength('')).toEqual({
      score: 0,
      label: '',
      tone: 'none',
      checks: [],
    });
  });

  it('classifica corretamente senhas fracas, médias, boas e fortes', () => {
    expect(evaluatePasswordStrength('Ab1!').label).toBe('Weak');
    expect(evaluatePasswordStrength('123456').label).toBe('Weak');
    expect(evaluatePasswordStrength('abc123').label).toBe('Fair');
    expect(evaluatePasswordStrength('Abc123').label).toBe('Good');
    expect(evaluatePasswordStrength('Abc123!').label).toBe('Strong');
  });
});

import { evaluatePasswordStrength } from '../../utils/passwordStrength.js';

const TONES = {
  none: { bar: 'bg-navy-800 light:bg-slate-200', text: 'text-auth-slate light:text-slate-500' },
  weak: { bar: 'bg-auth-red light:bg-red-500', text: 'text-auth-red light:text-red-600' },
  fair: { bar: 'bg-amber-400 light:bg-amber-500', text: 'text-amber-300 light:text-amber-700' },
  good: { bar: 'bg-yellow-400 light:bg-lime-600', text: 'text-yellow-300 light:text-lime-700' },
  strong: { bar: 'bg-emerald-400 light:bg-emerald-500', text: 'text-emerald-300 light:text-emerald-700' },
};

export default function PasswordStrength({ password = '' }) {
  if (!password) return null;

  const { score, label, tone, checks } = evaluatePasswordStrength(password);
  const colors = TONES[tone];

  return (
    <div
      className="space-y-2 rounded-xl border border-navy-800/90 bg-[rgba(0,29,61,0.55)] p-3 light:border-slate-200 light:bg-slate-50"
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="text-auth-slate light:text-slate-600">Password strength</span>
        <span className={`font-semibold ${colors.text}`}>{label}</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5" aria-hidden="true">
        {[1, 2, 3, 4].map((step) => (
          <span
            key={step}
            className={`h-1.5 rounded-full transition-colors duration-200 ${
              step <= score ? colors.bar : 'bg-navy-800 light:bg-slate-200'
            }`}
          />
        ))}
      </div>

      <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[11px]" aria-label="Password requirements">
        {checks.map((rule) => (
          <li
            key={rule.id}
            className={`flex items-center gap-1 ${
              rule.met
                ? 'text-emerald-300 light:text-emerald-700'
                : 'text-auth-slate/80 light:text-slate-500'
            }`}
          >
            <span aria-hidden="true">{rule.met ? '✓' : '•'}</span>
            <span>{rule.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

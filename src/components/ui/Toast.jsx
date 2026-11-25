import { useEffect } from 'react';

const VARIANTS = {
  success:
    'border-emerald-400/40 bg-[rgba(0,29,61,0.94)] text-white light:border-emerald-500/40 light:bg-white light:text-slate-900',
  info: 'border-yellow-400/40 bg-[rgba(0,29,61,0.94)] text-white light:border-navy-800/30 light:bg-white light:text-slate-900',
};

const BADGES = {
  success: 'bg-emerald-400/15 text-emerald-300 light:bg-emerald-100 light:text-emerald-700',
  info: 'bg-yellow-400/15 text-yellow-400 light:bg-amber-100 light:text-amber-800',
};

export default function Toast({ toast, onDismiss, duration = 4000 }) {
  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(onDismiss, duration);
    return () => window.clearTimeout(timer);
  }, [toast, duration, onDismiss]);

  if (!toast) return null;

  const variant = toast.variant ?? 'success';

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-5 left-4 right-4 z-50 flex items-start gap-3 rounded-2xl border p-4 shadow-[0_16px_36px_rgba(0,0,0,0.4)] backdrop-blur-md sm:left-auto sm:right-6 sm:w-96 light:shadow-lg ${VARIANTS[variant]}`}
    >
      <span
        aria-hidden="true"
        className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${BADGES[variant]}`}
      >
        {variant === 'success' ? '✓' : 'i'}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{toast.title}</p>
        <p className="mt-0.5 text-xs text-auth-slate light:text-slate-600">{toast.message}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Close notification"
        className="cursor-pointer rounded-md px-1.5 py-0.5 text-sm text-auth-slate transition hover:text-white focus-visible:outline-2 focus-visible:outline-yellow-300 light:text-slate-500 light:hover:text-slate-900 light:focus-visible:outline-navy-800"
      >
        ✕
      </button>
    </div>
  );
}

export default function ThemeToggle({ theme, onToggle }) {
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      aria-pressed={isLight}
      className="inline-flex h-[31px] cursor-pointer items-center gap-1.5 rounded-full border border-navy-800 bg-[rgba(0,29,61,0.82)] px-3 text-xs font-semibold text-yellow-400 transition hover:border-yellow-400/40 hover:bg-navy-800/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300 light:border-slate-300 light:bg-white/90 light:text-navy-800 light:shadow-xs light:hover:border-navy-800/40 light:hover:bg-white light:focus-visible:outline-navy-800"
    >
      <span aria-hidden="true">{isLight ? '☾' : '☀'}</span>
      <span>{isLight ? 'Dark' : 'Light'}</span>
    </button>
  );
}

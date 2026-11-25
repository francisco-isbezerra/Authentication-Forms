export default function SocialButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-[14px] border border-navy-800 bg-[rgba(0,29,61,0.82)] text-[19px] font-bold text-yellow-400 transition hover:border-yellow-400/40 hover:bg-navy-800/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300 light:border-slate-300 light:bg-white light:text-navy-800 light:hover:border-navy-800/50 light:hover:bg-slate-50 light:focus-visible:outline-navy-800"
    >
      {children}
    </button>
  );
}

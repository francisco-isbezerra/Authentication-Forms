export default function AuthCard({ title, subtitle, children }) {
  return (
    <section className="flex w-[min(480px,calc(100vw-32px))] flex-col gap-[18px] rounded-3xl border border-[rgba(0,53,102,0.88)] bg-[rgba(0,29,61,0.67)] px-[30px] pb-[30px] pt-[34px] shadow-[0_24px_48px_-8px_rgba(0,0,0,0.38)] backdrop-blur-[11px] light:border-slate-300/80 light:bg-white/88 light:shadow-[0_24px_48px_-12px_rgba(15,23,42,0.12)]">
      <header className="text-center">
        <h1 className="text-[34px] font-extrabold leading-tight text-yellow-300 light:text-navy-900">
          {title}
        </h1>
        <p className="mt-2 text-sm text-auth-slate light:text-slate-600">{subtitle}</p>
      </header>
      {children}
    </section>
  );
}

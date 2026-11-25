import { useState } from 'react';

export default function Input({
  id,
  label,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const resolvedType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="flex min-h-[80px] w-full flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[13px] font-medium leading-[normal] text-white light:text-slate-800"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={resolvedType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-14 w-full rounded-xl border bg-[rgba(0,29,61,0.78)] px-4 text-[15px] text-white outline-none transition placeholder:text-auth-slate light:bg-white light:text-slate-900 light:placeholder:text-slate-400 ${
            isPassword ? 'pr-16' : ''
          } ${
            error
              ? 'border-auth-red focus:ring-2 focus:ring-auth-red/40 light:border-red-500 light:focus:ring-red-500/25'
              : 'border-navy-800 focus:border-yellow-400/60 focus:ring-2 focus:ring-yellow-400/25 light:border-slate-300 light:focus:border-navy-800 light:focus:ring-navy-800/15'
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg px-2.5 py-1.5 text-xs font-semibold text-yellow-400 transition hover:bg-navy-800/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300 light:text-navy-800 light:hover:bg-slate-100 light:focus-visible:outline-navy-800"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="-mt-1 text-xs text-auth-red light:text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

import SocialButton from '../ui/SocialButton.jsx';

const PROVIDERS = [
  { id: 'google', name: 'Google', glyph: 'G' },
  { id: 'apple', name: 'Apple', glyph: 'A' },
  { id: 'facebook', name: 'Facebook', glyph: 'f' },
];

export default function SocialLogin({ onSelect }) {
  return (
    <div className="flex justify-center gap-[14px]">
      {PROVIDERS.map(({ id, name, glyph }) => (
        <SocialButton
          key={id}
          label={`Continue with ${name}`}
          onClick={() =>
            onSelect?.({
              variant: 'info',
              title: `${name} sign-in`,
              message: `O acesso com ${name} é apenas ilustrativo nesta atividade.`,
            })
          }
        >
          {glyph}
        </SocialButton>
      ))}
    </div>
  );
}

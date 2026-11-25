# Authentication Forms — React + Tailwind CSS

Projeto SPA didático com páginas **Sign Up**, **Sign In** e **Reset Password**, desenvolvido conforme a atividade da Aula 12 e evoluído com todos os desafios opcionais do Card 22. Interface de demonstração, sem servidor ou autenticação real.

## Requisitos

- Node.js em versão compatível com o Vite instalado
- npm
- Navegador moderno

### Versões registradas no ambiente

- **Node.js:** `v24.20.0`
- **npm:** `11.19.0`
- **React:** `19.3.1` (`react-dom@19.3.1`)
- **Vite:** `8.3.8` (`@vitejs/plugin-react@6.3.0`)
- **Tailwind CSS:** `4.3.5` (`@tailwindcss/vite@4.3.5`)

## Instalação e execução

```bash
npm install
npm run dev
```

*(No PowerShell com execução de scripts restrita, utilize `npm.cmd`.)*

## Testes e lint

```bash
npm test
npm run lint
```

## Compilação

```bash
npm run build
npm run preview
```

## Arquitetura

```text
App
└── AuthPage
    ├── BackgroundEffects
    ├── AuthBadge              → AUTHENTICATION UI
    ├── ThemeToggle            → Dark / Light
    ├── Toast                  → Feedback de sucesso / informativo
    ├── SignUpForm
    │   ├── AuthCard
    │   ├── Input              → Inclui Show / Hide Password
    │   ├── PasswordStrength   → Indicador de força e requisitos
    │   ├── Button
    │   ├── AuthDivider
    │   └── SocialLogin
    │       └── SocialButton
    ├── SignInForm
    │   ├── AuthCard
    │   ├── Input              → Inclui Show / Hide Password
    │   ├── Button
    │   ├── AuthDivider
    │   └── SocialLogin
    │       └── SocialButton
    └── ForgotPasswordForm
        ├── AuthCard
        ├── Input
        └── Button
```

- `App.jsx`: raiz da aplicação.
- `pages/AuthPage.jsx`: coordena a tela ativa (`signup`, `signin`, `forgot`), o tema (`dark` / `light`) e o `Toast`.
- `components/ui/Input.jsx`: campos reutilizáveis com acessibilidade (`aria-invalid`, `aria-describedby`) e alternância `Show / Hide Password`.
- `components/ui/PasswordStrength.jsx`: indicador de força da senha em tempo real no cadastro.
- `components/ui/Button.jsx`: botão reutilizável com estado `disabled` durante loading.
- `components/ui/SocialButton.jsx`: botão social visual (`G`, `A`, `f`) com `aria-label`.
- `components/ui/AuthBadge.jsx`: etiqueta `AUTHENTICATION UI`.
- `components/ui/ThemeToggle.jsx`: alternância entre tema escuro (padrão do Figma) e tema claro.
- `components/ui/Toast.jsx`: notificações não bloqueantes de sucesso e informação.
- `components/auth/AuthCard.jsx`: cartão translúcido compartilhado entre os formulários.
- `components/auth/SignInForm.jsx`: login com validação, loading e **Remember Email** (apenas e-mail no `localStorage`).
- `components/auth/SignUpForm.jsx`: cadastro com **Confirm Password**, indicador de força e loading.
- `components/auth/ForgotPasswordForm.jsx`: recuperação de senha demonstrativa com retorno ao login.
- `components/auth/AuthDivider.jsx` e `SocialLogin.jsx`: divisor `OR CONTINUE WITH` e composição dos botões sociais.
- `components/layout/BackgroundEffects.jsx`: glows decorativos sobre o fundo `#000814` (e versão clara no tema light).
- `utils/passwordStrength.js` e `utils/storage.js`: avaliação de senha e persistência segura apenas de e-mail lembrado e tema.
- `index.css`: Tailwind CSS v4 (`@import "tailwindcss"`, `@theme`, `@custom-variant light`).

## Desafios implementados (Card 22)

1. **Show / Hide Password:** integrado ao `Input` reutilizável preservando `id`, `label`, `error` e `aria-describedby`.
2. **Confirm Password no cadastro:** validação obrigatória e conferência de igualdade com a senha.
3. **Indicador de força da senha:** barra de 4 níveis (`Weak`, `Fair`, `Good`, `Strong`) e checklist em tempo real.
4. **Remember Email:** persiste **somente o e-mail** no `localStorage` quando `Remember me` está ativo.
5. **Toast de sucesso:** substitui `window.alert` por notificações `Toast` acessíveis (`role="status"`).
6. **Forgot Password:** fluxo completo acessível pelo botão `Forgot password?`.
7. **Dark / Light Theme:** alternância instantânea mantendo o tema escuro do Figma como padrão.

## Referência no Figma

https://www.figma.com/design/M9uYIV5AskfRFf2VgmtYwJ?node-id=2-29

## Commits sugeridos (roteiro 01–22)

1. `chore: initialize authentication forms project`
2. `chore: organize authentication app structure`
3. `feat: add reusable input component`
4. `feat: add reusable button component`
5. `feat: add reusable social button component`
6. `feat: compose static signup form`
7. `feat: add static signin form and auth page`
8. `chore: validate static component architecture`
9. `chore: configure tailwind css with vite`
10. `style: add authentication theme tokens`
11. `style: add reusable auth ui styles`
12. `style: build authentication page layout`
13. `chore: validate static authentication ui`
14. `feat: toggle authentication forms with state`
15. `feat: connect authentication form switch events`
16. `feat: add controlled signup fields`
17. `feat: add controlled signin and form submit`
18. `feat: add authentication form validation`
19. `feat: add authentication loading states`
20. `fix: improve auth responsiveness and accessibility`
21. `docs: finalize authentication forms project`
22. `feat: add optional authentication enhancements`

## Segurança

Nunca armazene senhas no `localStorage` nem escreva senhas no `console`. Apenas o e-mail lembrado (`auth-forms:remembered-email`) e a preferência de tema (`auth-forms:theme`) são salvos localmente.

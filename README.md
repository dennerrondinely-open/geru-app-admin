# Geru App Admin

Painel administrativo da plataforma Geru, desenvolvido para gerenciar **Sections** (comunicações do app) e **Links** (onelinks de navegação). Construído com React, TypeScript, Material UI e Firebase.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts](#scripts)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Padrões de Desenvolvimento](#padrões-de-desenvolvimento)

---

## Visão Geral

O **Geru App Admin** é um SPA (Single Page Application) que fornece uma interface para administração dos conteúdos dinâmicos do app Geru. A autenticação é feita via Firebase Authentication e os dados são persistidos no Firestore.

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19 | UI |
| TypeScript | 5.9 | Tipagem estática |
| Vite | 7 | Build tool |
| Material UI (MUI) | 7 | Design system |
| Firebase | 12 | Auth + Firestore |
| React Router | 7 | Roteamento |
| Notistack | 3 | Notificações (snackbar) |
| Lucide React | 0.56 | Ícones |

---

## Pré-requisitos

- Node.js `>= 18`
- pnpm `>= 8` (recomendado) ou npm/yarn

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/dennerrondinely-open/geru-app-admin.git
cd geru-app-admin

# Instale as dependências
pnpm install

# Copie o arquivo de variáveis de ambiente
cp .env.example .env.local
# Preencha as variáveis com os dados do seu projeto Firebase

# Inicie o servidor de desenvolvimento
pnpm dev
```

---

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_CLIENT_ID=
```

> As variáveis prefixadas com `VITE_` são expostas ao cliente pelo Vite.

---

## Scripts

```bash
pnpm dev        # Inicia o servidor de desenvolvimento (HMR)
pnpm build      # Build de produção (tsc + vite build)
pnpm preview    # Preview do build de produção
pnpm lint       # Executa o ESLint
```

---

## Arquitetura do Projeto

```
src/
├── api/                        # Configuração Firebase e hooks genéricos
│   ├── firebase.ts             # Inicialização do app Firebase
│   └── hooks/
│       ├── useFirestoreCollection.ts  # Hook para ouvir coleções em real-time
│       ├── useFirestoreDoc.ts         # Hook para ouvir um documento em real-time
│       ├── useAddDocument.ts          # Hook para adicionar documentos
│       ├── useUpdateDocument.ts       # Hook para atualizar documentos
│       └── useDeleteDocument.ts       # Hook para deletar documentos
│
├── domains/                    # Interfaces de domínio (contratos de dados)
│   ├── section.ts              # Interface Section
│   └── link.ts                 # Interface Link
│
├── use-cases/                  # Casos de uso (lógica de negócio por feature)
│   ├── sections/
│   │   ├── useGetSectionsUseCase.ts
│   │   ├── useGetSectionUseCase.ts
│   │   ├── useAddSectionUseCase.ts
│   │   ├── useUpdateSectionUseCase.ts
│   │   └── useDeleteSectionUseCase.ts
│   └── links/
│       ├── useGetLinksUseCase.ts
│       ├── useGetLinkUseCase.ts
│       └── useUpdateLinkUseCase.ts
│
├── context/                    # Contextos React (estado global por feature)
│   ├── auth/                   # Contexto de autenticação
│   ├── section/                # Contexto de sections (lista + loading)
│   └── link/                   # Contexto de links (lista + loading)
│
├── components/
│   ├── common/                 # Componentes específicos de domínio
│   │   ├── section-form/       # Formulário de criação/edição de Section
│   │   ├── section-table/      # Tabela listagem de Sections
│   │   ├── link-form/          # Formulário de edição de Link
│   │   └── link-table/         # Tabela listagem de Links
│   ├── form/                   # Componentes de formulário genéricos
│   │   ├── Input/
│   │   ├── Select/
│   │   └── Switch/
│   └── layout/                 # Componentes de layout da aplicação
│       ├── AppLayout/          # Layout principal (Header + Sidebar + main)
│       ├── Header/             # Barra superior com menu e perfil do usuário
│       └── Sidebar/            # Menu lateral de navegação persistente
│
├── pages/                      # Páginas da aplicação (uma por rota)
│   ├── Home.tsx                # Dashboard com cards de métricas
│   ├── Sections.tsx            # Listagem de Sections
│   ├── CreateSection.tsx       # Criação de Section
│   ├── EditSection.tsx         # Edição de Section
│   ├── Links.tsx               # Listagem de Links
│   └── EditLink.tsx            # Edição de Link
│
├── theme/
│   └── index.ts                # Tema MUI customizado com identidade visual Geru
│
├── routes.tsx                  # Definição de rotas da aplicação
├── App.tsx                     # Root da aplicação com providers
└── main.tsx                    # Entry point
```

### Fluxo de dados

```
Firestore → api/hooks → use-cases → context → pages/components
```

- **`api/hooks`** — hooks genéricos que abstraem operações do Firestore (CRUD + real-time)
- **`use-cases`** — amarram os hooks genéricos ao domínio específico (ex: `useGetLinksUseCase` usa `useFirestoreCollection<Link>("links")`)
- **`context`** — expõem o estado para a árvore de componentes via React Context
- **`pages`** — consomem os contextos e use-cases para renderizar as telas

---

## Funcionalidades

### Autenticação
- Login com email/senha via Firebase Authentication
- Sessão persistida automaticamente
- Logout com dropdown no Header

### Dashboard (`/`)
- Cards de métricas em tempo real:
  - Total de Sections
  - Sections Ativas / Inativas
  - Links Ativos

### Sections (`/sections`)
- Listagem de todas as sections em tabela
- Criação de nova section (`/section`)
- Edição de section existente (`/section/:id`)
- Campos: nome, pré-título, título, imagem de fundo, mensagem, texto do botão, link do botão, tipo do botão, status ativo/inativo

### Links (`/links`)
- Listagem de todos os links em tabela
- Edição de link existente (`/link/:id`)
- Campos: nome, tipo, webUrl, appUrl, appStore, playStore, status ativo/inativo

### Navegação
- Sidebar persistente com toggle (abrir/fechar)
- Item ativo destacado com cor primária da marca
- Header com menu hamburger, email do usuário e dropdown de perfil

---

## Padrões de Desenvolvimento

### Path aliases

O projeto usa path aliases configurados no `vite.config.ts`, evitando imports relativos longos:

```ts
import { useLinks } from "context/link";       // ✅
import { useLinks } from "../../context/link"; // ❌
```

Aliases disponíveis: `api`, `assets`, `components`, `context`, `domains`, `pages`, `use-cases`.

### Adicionando uma nova feature

Siga o padrão existente criando os arquivos em cada camada:

1. **Domain** — `src/domains/minhaFeature.ts` (interface)
2. **Use cases** — `src/use-cases/minhaFeature/` (um arquivo por operação)
3. **Context** — `src/context/minhaFeature/` (context, provider, hook, types, index)
4. **Componentes** — `src/components/common/minha-feature-table/` e `minha-feature-form/`
5. **Páginas** — `src/pages/MinhaFeature.tsx`, `EditMinhaFeature.tsx`
6. **Rotas** — adicionar em `src/routes.tsx`
7. **Provider** — envolver no `App.tsx` se necessário globalmente

### Convenções

- Componentes em `PascalCase`, arquivos em `kebab-case` ou `PascalCase`
- Hooks sempre prefixados com `use`
- Use-cases nomeados como `use[Ação][Entidade]UseCase`
- Um hook por operação nos use-cases
- Providers de contexto não duplicados — se o contexto já existe no `App`, reutilize-o nas páginas filhas


```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

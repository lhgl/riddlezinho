# 🎮 RiddleZinho - Jogo de Charadas Interativo

[![Node.js Version](https://img.shields.io/badge/node-20.x%2B-green)](https://nodejs.org/en/download/)
[![TypeScript](https://img.shields.io/badge/typescript-5.6-blue)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/express-4.21.0-blue)](https://expressjs.com/)
[![Test Coverage](https://img.shields.io/badge/coverage-83%25-yellow)](#-testes)
[![Tests](https://img.shields.io/badge/tests-410%2B%20passed-brightgreen)](#-testes)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE.md)

**Status**: ✅ Production Ready (v3.2.0) | **Docs**: [docs/](docs/)

---

## 🎯 Destaques da v3.2.0

🗄️ **PostgreSQL + Prisma ORM**
- PostgreSQL 16 em produção via `DATABASE_URL`
- In-memory automático em dev/testes (zero configuração)
- Deploy one-click no Render.com via `render.yaml`

🎨 **UX/UI Moderno**
- Dark mode com persistência em localStorage
- Toast notifications animadas
- Loading spinner em formulários
- Layout responsivo para mobile

🏆 **Achievements + Daily Challenge**
- 5 badges por marcos: Iniciante → LENDA
- Fase do dia determinística para todos os jogadores
- Conquistas retornadas ao completar fase

🧪 **Testes Robustos**
- 410+ testes passando
- Testes unitários, integração e extended

---

## 📖 Índice Rápido

- [🎯 Início Rápido](#-início-rápido)
- [📋 Requisitos](#-requisitos)
- [🚀 Instalação](#-instalação)
- [🏗️ Arquitetura TypeScript](#-arquitetura-typescript)
- [🎮 Como Jogar](#-como-jogar)
- [📚 Documentação](#-documentação)

---

## 🎯 Início Rápido

```bash
# 1. Clone
git clone https://github.com/lhgl/riddlezinho.git
cd riddlezinho

# 2. Instale dependências
npm install

# 3. Compile TypeScript
npm run build

# 4. Rode testes
npm test

# 5. Inicie servidor
npm start

# 6. Acesse
# http://localhost:5000
```

**Pronto!** O jogo está rodando.

---

## 📋 Requisitos

### Sistema
- **Node.js**: 20.x LTS ou superior
- **npm**: 9.x ou superior
- **TypeScript**: 5.6+ (incluído nas devDependencies)

### Desenvolvimento
- **Editor**: VS Code recomendado (com extensão TypeScript)
- **RAM**: Mínimo 512MB
- **Disk**: Mínimo 500MB

---

## 🚀 Instalação

### Passo 1: Instalar Dependências

```bash
npm install
```

### Passo 2: Compilar TypeScript

```bash
# Compilar para JavaScript
npm run build

# Output: dist/
```

### Passo 3: Rodar Testes

```bash
# Todos os testes
npm test

# Com coverage
npm test -- --coverage
```

### Passo 4: Iniciar Servidor

```bash
# Produção (usa dist/)
npm start

# Desenvolvimento (Windows/Linux/Mac)
npm run dev
```

---

## 🏗️ Arquitetura TypeScript

### Estrutura de Pastas

```
riddlezinho/
├── src/                      # Código TypeScript
│   ├── config/
│   │   ├── config.ts        # Configurações de ambiente
│   │   └── phases.ts        # Configuração das 99 fases
│   ├── controllers/
│   │   ├── AuthController.ts       # Autenticação e leaderboard
│   │   ├── AchievementController.ts # Conquistas e daily challenge
│   │   └── PhaseController.ts      # Renderização de fases
│   ├── middleware/
│   │   ├── errorHandler.ts  # Tratamento de erros
│   │   ├── rateLimit.ts     # Rate limiting
│   │   └── security.ts      # Headers de segurança
│   ├── repositories/        # Padrão Repository
│   │   ├── interfaces.ts    # IUserRepository, ILeaderboardRepository
│   │   ├── InMemory*.ts     # Implementações em memória (dev/testes)
│   │   ├── Prisma*.ts       # Implementações PostgreSQL (produção)
│   │   └── RepositoryFactory.ts
│   ├── routes/
│   │   ├── auth.ts          # Rotas de autenticação
│   │   ├── achievements.ts  # Rotas de conquistas
│   │   ├── home.ts          # Rotas principais
│   │   ├── phases.ts        # Rotas de fases
│   │   └── tips.ts          # Rotas de dicas
│   ├── services/
│   │   ├── LeaderboardService.ts
│   │   ├── AchievementService.ts
│   │   └── DailyChallengeService.ts
│   ├── utils/
│   │   ├── auth.ts          # Funções de autenticação
│   │   └── logger.ts        # Logger estruturado
│   └── server.ts            # Servidor principal
├── prisma/
│   └── schema.prisma        # Modelos PostgreSQL
├── tests/                    # Testes (JavaScript)
│   ├── unit/
│   └── integration/
├── dist/                     # JavaScript compilado
├── views/                    # Templates EJS
├── public/                   # Arquivos estáticos
├── tsconfig.json            # Configuração TypeScript
├── package.json
└── README.md
```

### Tipos Principais

```typescript
// Fase do jogo
interface Phase {
  id: string;
  number: number;
  level: number;
  name: string;
  type: string;
  image: string | null;
  hint: string;
}

// Usuário
interface User {
  id: string;
  username: string;
  email: string;
  password: string; // hash bcrypt
  createdAt: Date;
  lastLogin: Date | null;
  preferences: {
    language: string;
    notifications: boolean;
  };
}

// Score do Leaderboard
interface UserScore {
  userId: string;
  username: string;
  score: number;
  completedPhases: number;
  level: number;
  timeSpent: number;
}
```

### Fluxo de Dados

```
┌─────────────┐
│   Cliente   │
└──────┬──────┘
       │ HTTP Request
       ▼
┌─────────────────┐
│  Express App    │ ← helmet, compression, rateLimit
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Routes       │ ← auth.ts, home.ts, phases.ts
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Controllers    │ ← AuthController, PhaseController
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Utils/Config   │ ← auth.ts, logger.ts, phases.ts
└─────────────────┘
```

---

## 🎮 Como Jogar

### Primeiros Passos

1. **Acesse**: http://localhost:5000
2. **Clique em "Jogar"**: Não precisa de cadastro!
3. **Resolva as charadas**: Use as dicas para encontrar a resposta
4. **Avance**: Substitua a URL pela resposta encontrada

### Sistema de Pontuação

Cada fase mostra:
- **Pontuação da Fase**: 100 pts
- **Nível**: 1 ou 2
- **Seu Progresso**: % completado + score total (se logado)

### Opcional: Criar Conta

Com conta você pode:
- ✅ Aparecer no leaderboard global
- ✅ Acompanhar seu progresso
- ✅ Competir com outros jogadores

**Nota**: O registro é **100% opcional**.

---

## 📚 Documentação

| Documento | Propósito |
|-----------|----------|
| [docs/QUICK_START.md](docs/QUICK_START.md) | Instalação rápida |
| [docs/API.md](docs/API.md) | Endpoints HTTP |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Arquitetura TypeScript |
| [docs/USER_GUIDE.md](docs/USER_GUIDE.md) | Como jogar |
| [docs/DEPLOY.md](docs/DEPLOY.md) | Deploy em produção (Docker, Render.com) |
| [docs/SECURITY.md](docs/SECURITY.md) | Segurança |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | Contribuir |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Roadmap de versões |

---

## 🧪 Testes

### Executar Testes

```bash
# Todos os testes
npm test

# Com coverage
npm test -- --coverage

# Modo watch
npm run test:watch
```

### Cobertura Atual

```
Test Suites: 20+ passed
Tests:       410+ passed

Por módulo:
├─ controllers/       : 95%+ ✅
├─ middleware/        : 100% ✅
├─ routes/            : 100% ✅
├─ services/          : 90%+ ✅
├─ repositories/      : 90%+ ✅
├─ config/            : 100% ✅
└─ Overall            :  83%
```

### Testes por Categoria

| Categoria | Arquivos | Testes | Status |
|-----------|----------|--------|--------|
| Unit | 14+ | 330+ | ✅ |
| Integration | 4 | 50+ | ✅ |
| Extended | 2 | 30+ | ✅ |

---

## 📊 Versões

### v3.2.0 (Atual) ✅

**Lançado**: Maio 2026

✅ **PostgreSQL + Prisma ORM** (v3.0.0)
- PostgreSQL 16 em produção, in-memory em dev/testes
- RepositoryFactory com zero impacto nos testes
- Deploy no Render.com via render.yaml
- Dockerfile multi-stage

✅ **UX/UI Moderno** (v3.1.0)
- Dark mode com toggle e persistência
- Toast notifications animadas
- Loading spinner em formulários
- Layout responsivo mobile

✅ **Achievements + Daily Challenge** (v3.2.0)
- 5 badges por marcos de fases completadas
- Fase do dia determinística
- 410+ testes passando

---

## 📋 Próximas Versões

### Roadmap

```
v3.2.0 ✅ ────── v3.3.0 📋 ────── v4.0.0 📋
   │                 │                │
PostgreSQL        WebSockets       SPA Frontend
Dark Mode         Redis            API Pública
Achievements      PWA              OpenAPI
Daily Challenge   E2E Tests        i18n
```

### v3.3.0 - Advanced

- [ ] WebSockets para leaderboard em tempo real
- [ ] Redis para rate limiting distribuído
- [ ] PWA (Service Worker, offline mode)
- [ ] Testes E2E (Playwright)

### v4.0.0 - SPA + API Pública

- [ ] Frontend SPA separado (React/Vue)
- [ ] API pública RESTful + OpenAPI/Swagger
- [ ] Multi-idioma (i18n)
- [ ] Webhooks para integrações

---

## 🤝 Contribuindo

Veja [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)

### Setup de Desenvolvimento

```bash
# Instalar dependências
npm install

# Compilar TypeScript (watch mode)
npm run build -- --watch

# Rodar testes
npm test

# Iniciar servidor (dev)
npm run dev
```

### Coverage

```bash
# Ver linhas não cobertas
npm test -- --coverage
```

---

## 📞 Suporte

### Problemas Comuns

**"Port 5000 already in use"**
```bash
# Usar outra porta
PORT=3000 npm start

# Ou matar processo usando a porta
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:5000 | xargs kill -9
```

**"Muitas requisições. Tente novamente mais tarde."**
```bash
# Rate limit atingido (desenvolvimento)
# Aguarde 1-15 minutos ou reinicie o servidor

# Para desabilitar em desenvolvimento:
# Comente as linhas de rateLimit em src/server.ts
```

**Erros de compilação TypeScript**
```bash
# Limpar dist e recompilar
rm -rf dist/
npm run build

# Windows (PowerShell):
Remove-Item -Recurse -Force dist
npm run build
```

**"Cannot find module"**
```bash
npm install
npm run build
```

**Badge de progresso não atualiza**
```bash
# Verificar se está logado
# Verificar console do navegador (F12)
# Limpar localStorage e fazer login novamente
```

### Links Úteis

- 📚 [Documentação Completa](docs/)
- 🐛 [Reportar Bug](https://github.com/lhgl/riddlezinho/issues)
- 💡 [Sugerir Feature](https://github.com/lhgl/riddlezinho/issues)

---

<div align="center">

**Feito com ❤️ em TypeScript**

[⬆ Voltar ao topo](#-riddlezinho---jogo-de-charadas-interativo)

</div>

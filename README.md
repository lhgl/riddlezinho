# 🎮 RiddleZinho - Jogo de Charadas Interativo

[![Node.js Version](https://img.shields.io/badge/node-20.x%2B-green)](https://nodejs.org/en/download/)
[![TypeScript](https://img.shields.io/badge/typescript-5.6-blue)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/express-4.21.0-blue)](https://expressjs.com/)
[![Test Coverage](https://img.shields.io/badge/coverage-83%25-yellow)](#-testes)
[![Tests](https://img.shields.io/badge/tests-327%20passed-brightgreen)](#-testes)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE.md)

**Status**: ✅ Production Ready (v2.5.0) | **Docs**: [docs/](docs/)

---

## 🎯 Destaques da v2.5.0

✨ **Progresso do Usuário Funcional**
- Badge de progresso atualiza automaticamente
- Score e % completado em tempo real
- Histórico de fases completadas

🔒 **Rate Limit Ajustado**
- 500 requisições por 15 minutos (geral)
- 10 tentativas de login por 15 minutos
- 200 requisições por minuto (API)

🧪 **Testes Robustos**
- 327 testes passando
- 100% de cobertura em controllers, middleware e routes
- Testes unitários e de integração

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
│   │   ├── AuthController.ts # Autenticação e leaderboard
│   │   └── PhaseController.ts # Renderização de fases
│   ├── middleware/
│   │   ├── errorHandler.ts  # Tratamento de erros
│   │   ├── rateLimit.ts     # Rate limiting
│   │   └── security.ts      # Headers de segurança
│   ├── routes/
│   │   ├── auth.ts          # Rotas de autenticação
│   │   ├── home.ts          # Rotas principais
│   │   ├── phases.ts        # Rotas de fases
│   │   └── tips.ts          # Rotas de dicas
│   ├── utils/
│   │   ├── auth.ts          # Funções de autenticação
│   │   └── logger.ts        # Logger estruturado
│   └── server.ts            # Servidor principal
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
| [docs/SECURITY.md](docs/SECURITY.md) | Segurança |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | Contribuir |

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
Test Suites: 18 passed, 18 total
Tests:       327 passed, 327 total

Por módulo:
├─ controllers/       : 100% ✅
├─ middleware/        : 100% ✅
├─ routes/            : 100% ✅
├─ config/            : 100% ✅
├─ utils/auth.ts      :  98% ⚠️ (linha 160 pendente)
└─ Overall            :  83%

Meta: 100% de cobertura
```

### Testes por Categoria

| Categoria | Arquivos | Testes | Status |
|-----------|----------|--------|--------|
| Unit | 12 | 280+ | ✅ |
| Integration | 4 | 47+ | ✅ |
| Extended | 2 | 50+ | ✅ |

---

## 📊 Versões

### v2.5.0 (Atual) ✅

**Lançado**: Fevereiro 2026

✅ **TypeScript Migration Completa**
- Todo código fonte em TypeScript
- Tipos definidos para todas as entidades
- Compilação para dist/

✅ **User Progress Badge**
- Badge de progresso em todas as fases
- Mostra % completado e score
- Atualização automática ao completar fases
- Funciona para usuários logados e anônimos

✅ **Funcionalidades**
- 99+ fases com padrão consistente
- Leaderboard funcional
- Login/Registro com JWT
- Rate limiting ajustado (500 req/15min)
- Logging estruturado com Pino

✅ **Qualidade**
- 327 testes passando
- Cobertura 83%+ (95%+ nos módulos principais)
- ESLint + TypeScript strict mode

---

## 📋 TODO - Próximos Passos

### Roadmap Visual

```
v2.5.0 ✅ ────── v2.6.0 🔄 ────── v2.7.0 📋 ────── v2.8.0 📋
   │                │                 │                │
   │                │                 │                │
 TypeScript     UX/UI            Social         Infra
 100%           Feedback         Compartilha    DB Real
 Testes 83%     Loading          Conquistas     Redis
 Progresso      Dark Mode        Perfil         Deploy
                Mobile           Histórico      Docker
```

### v2.6.0 - Melhorias de UX/UI

- [ ] Corrigir linha 160 do auth.ts (cobertura 100%)
- [ ] Adicionar feedback visual ao submeter resposta
- [ ] Loading spinner durante navegação
- [ ] Toast notifications para erros/sucesso
- [ ] Dark mode toggle
- [ ] Responsividade mobile melhorada

### v2.7.0 - Funcionalidades Sociais

- [ ] Compartilhamento de conquistas (Twitter, Discord)
- [ ] Gerar imagem com score/card de progresso
- [ ] Sistema de conquistas/medalhas
- [ ] Perfil público de usuário
- [ ] Histórico de fases completadas

### v2.8.0 - Infraestrutura

- [ ] Banco de dados real (PostgreSQL/MySQL)
- [ ] Redis para cache e sessões
- [ ] Deploy automatizado (GitHub Actions)
- [ ] Variáveis de ambiente para produção
- [ ] Docker compose para desenvolvimento

### v2.9.0 - Técnico

- [ ] Testes E2E (Playwright/Cypress)
- [ ] WebSockets para leaderboard em tempo real
- [ ] PWA (Service Worker, offline mode)
- [ ] Analytics de uso (opcional, respeitando privacidade)
- [ ] Documentação OpenAPI/Swagger

### v3.0.0 - Expansão

- [ ] Criar modo "Daily Challenge" (fase do dia)
- [ ] Sistema de dicas premium (sem quebrar o jogo)
- [ ] Multi-idioma (i18n)
- [ ] API pública para desenvolvedores
- [ ] Webhook para integrações

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

### Coverage 100%

Para ajudar a atingir 100% de cobertura:

```bash
# Ver linhas não cobertas
npm test -- --coverage

# Arquivo pendente: src/utils/auth.ts (linha 160)
# Teste necessário: verifyToken com erro não-TokenExpiredError
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

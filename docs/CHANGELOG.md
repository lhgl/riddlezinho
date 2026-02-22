# 📝 Changelog - RiddleZinho

Todas as mudanças notáveis serão documentadas neste arquivo.

Formato baseado em [Keep a Changelog](https://keepachangelog.com/).

---

## [2.5.0] - 2026-02-22

### ✨ Adicionado

- ✅ **TypeScript Migration Completa**
  - Todo código fonte migrado para TypeScript
  - Tipos definidos para todas as entidades
  - Interfaces para Phase, User, UserScore
  - Strict mode habilitado

- ✅ **User Progress Badge**
  - Badge de progresso em todas as 271 fases
  - Mostra % completado e score do usuário
  - Carregamento dinâmico via JavaScript
  - Funciona para usuários logados e anônimos

- ✅ **Documentação Atualizada**
  - README.md reescrito para TypeScript
  - ARCHITECTURE.md criado
  - API.md atualizado
  - QUICK_START.md atualizado
  - CONTRIBUTING.md atualizado

### 🔧 Modificado

- 🔧 Estrutura de pastas atualizada
  - Código fonte em `src/`
  - Output em `dist/`
  - Testes em `tests/`

- 🔧 Configuração de build
  - tsconfig.json configurado
  - jest.config.json para TypeScript
  - babel.config.js para testes JS

- 🔧 Dependências atualizadas
  - TypeScript 5.6
  - Jest 29.x com ts-jest
  - Types para Node, Express, Jest

### 📦 Dependencies

**Adicionado:**
- typescript@^5.6.3
- @types/node@^22.9.0
- @types/express@^5.0.0
- @types/jest@^29.5.14
- @types/bcryptjs@^2.4.6
- @types/jsonwebtoken@^9.0.7
- ts-jest@^29.2.5
- @babel/core, @babel/preset-env, babel-jest

**Mantido:**
- express@^4.21.0
- bcryptjs@^2.4.3
- jsonwebtoken@^9.0.2
- helmet@^7.1.0
- pino@^9.4.0

---

## [2.4.0] - 2026-02-22

### ✨ Adicionado

- ✅ Score display em todas as 271 fases
- ✅ Badges de nível em cada fase
- ✅ Sistema de progresso do usuário
- ✅ Documentação do fluxo de dados

### 🔧 Modificado

- 🔧 271 fases atualizadas com score display
- 🔧 Scripts de atualização em massa

---

## [2.3.0] - 2026-02-22

### ✨ Adicionado

- ✅ Leaderboard funcional com UI
- ✅ Sistema de login/registro com páginas dedicadas
- ✅ Pontuação visível em cada fase
- ✅ Badges por nível
- ✅ 323 testes passando
- ✅ 96%+ de cobertura de código

### 🔧 Modificado

- 🔧 views/login.ejs criado
- 🔧 views/leaderboard.ejs criado
- 🔧 views/jogar.ejs atualizado
- 🔧 src/routes/home.js adiciona rotas /login e /leaderboard

---

## [2.2.0] - 2026-02-22

### ✨ Adicionado

- ✅ Padrão consistente em todas as 99 fases
- ✅ Cobertura de testes: 83% statements, 90% branches
- ✅ 212 testes passando em 15 test suites
- ✅ Testes completos para auth, controllers, middleware

### 🔧 Modificado

- 🔧 Removida dependência Oracle Database
- 🔧 Simplificada estrutura para desenvolvimento sem banco de dados

### 🗑️ Removido

- 🗑️ Dependência `oracledb`
- 🗑️ Arquivos Oracle-related

---

## [2.1.1] - 2026-02-22

### ✨ Adicionado

- ✅ Correção do erro de inicialização (pino-pretty)
- ✅ Arquivo .env para desenvolvimento
- ✅ 227 testes passando
- ✅ Cobertura de testes: 77%+

### 🐛 Corrigido

- ✅ Erro `unable to determine transport target for "pino-pretty"`
- ✅ Paths incorretos em testes de integração

---

## [2.0.0] - 2026-02-21

### ✨ Adicionado

- ✅ Oracle Database integration
- ✅ JWT authentication
- ✅ Rate limiting
- ✅ Leaderboard
- ✅ 85+ automated tests

---

## [1.0.0] - 2026-02-20

### ✨ Adicionado

- ✅ Projeto inicial
- ✅ 99 fases
- ✅ Express.js server
- ✅ EJS templates

---

**Versão Atual**: 2.5.0 | **TypeScript** | **Node.js 20.x**

# CHANGELOG

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere a [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [3.2.0] - 2026-05-21

### ✨ Adicionado — v3.2.0 Features

- **AchievementService**: sistema de 5 conquistas/badges progressivas (Iniciante → LENDA)
- **DailyChallengeService**: desafio do dia determinístico (mesma fase para todos no mesmo dia)
- **InMemoryAchievementRepository**: repositório para conquistas in-memory
- **AchievementController**: handlers HTTP para `/achievements` e `/achievements/me`
- **`GET /achievements`**: lista todas as conquistas com status earned/locked por usuário
- **`GET /achievements/me`**: conquistas do usuário autenticado
- **`GET /achievements/daily`**: fase do dia com contador regressivo
- **Integração completa**: `completePhase` retorna `newAchievements` na resposta
- **Views**: `achievements.ejs` e `daily.ejs` com design responsivo
- 11 novos testes (AchievementService + DailyChallengeService)
- **Total**: 410 testes passando

## [3.1.0] - 2026-05-21

### ✨ Adicionado — v3.1.0 UX/UI

- **Dark mode**: toggle ☀️/🌙 com persistência via `localStorage` e respeito a `prefers-color-scheme`
- **Toast notifications**: sistema de feedback visual animado (success/error/info/warning)
- **Loading spinner**: overlay com spinner CSS-only ao submeter formulários com `data-loading`
- **Mobile responsive**: media queries 768px — tabelas viram cards, menus empilhados, forms 100%
- **CSS Variables**: `--bg`, `--text`, `--surface`, `--border`, `--primary` para theming consistente
- **Achievement badge grid**: layout CSS Grid responsivo para exibição de conquistas

## [3.0.0] - 2026-05-21

### ✨ Adicionado — v3.0.0 Production Foundation

- **Prisma ORM v5.22.0**: schema com models `User`, `UserScore`, `Achievement`, `UserAchievement`
- **PrismaUserRepository** e **PrismaLeaderboardRepository**: implementações PostgreSQL 16
- **RepositoryFactory**: seleção automática InMemory (sem `DATABASE_URL`) ou Prisma (com `DATABASE_URL`) — zero impacto em testes
- **Interfaces assíncronas**: `IUserRepository` e `ILeaderboardRepository` com `Promise<T>` em todos os métodos
- **docker-compose.yml**: reescrito com PostgreSQL 16-alpine (removido Oracle)
- **docker-compose.dev.yml**: ambiente de desenvolvimento com porta 5432 exposta
- **Dockerfile multi-stage**: builder (npm ci + prisma generate + tsc) + runner (somente produção)
- **render.yaml**: deploy one-click no Render.com com PostgreSQL free tier
- **docs/DEPLOY.md**: guia completo de produção — Render.com, Railway, Docker Swarm, Nginx LB, escalonamento horizontal
- **Graceful shutdown**: `SIGTERM`/`SIGINT` com `RepositoryFactory.disconnect()`
- **`/health`** atualizado: campo `db` indica `postgres` ou `memory`

### 🔧 Modificado

- `src/utils/auth.ts`: `users` Map → `userRepo` via `RepositoryFactory`; todas as funções async
- `src/services/AuthService.ts`: todas as chamadas ao repo com `await`
- `src/services/LeaderboardService.ts`: todas as chamadas ao repo com `await`
- `src/controllers/AuthController.ts`: injeção de `ILeaderboardRepository` via constructor
- **package.json**: versão `3.2.0`; deps `@prisma/client@^5.22.0` + `prisma@^5.22.0`
- Todos os arquivos de teste atualizados para `async/await` compatível com repos assíncronos

## [2.2.0] - 2026-02-22

### ✨ Adicionado
- ✅ Padrão consistente em todas as 99 fases (nome descritivo + hint)
- ✅ Cobertura de testes: 83% statements, 90% branches, 82% lines
- ✅ 212 testes passando em 15 test suites
- ✅ Testes completos para auth, controllers, middleware, routes, utils
- ✅ Documentação atualizada e simplificada

### 🔧 Modificado
- 🔧 Removida dependência Oracle Database (não utilizada)
- 🔧 Removidos arquivos Oracle: `oracle.js`, `oracleAuthService.js`, `AuthControllerOracle.js`
- 🔧 Removidos arquivos de documentação redundantes
- 🔧 Atualizado `package.json` para versão 2.2.0
- 🔧 Simplificada estrutura para desenvolvimento sem banco de dados
- 🔧 Todas as fases agora seguem padrão: `Fase X - Título Descritivo`

### 🗑️ Removido
- 🗑️ Dependência `oracledb`
- 🗑️ Arquivos Oracle-related
- 🗑️ Documentação redundante (12 arquivos)
- 🗑️ Referências a Oracle no README

### 📦 Dependencies
- ➖ Removido: `oracledb@^6.3.0`
- ✅ Mantido: `express@^4.20.0`, `pino@^8.17.2`, `jsonwebtoken@^9.0.2`

## [2.1.1] - 2026-02-22

### ✨ Adicionado
- ✅ Correção do erro de inicialização (`pino-pretty`)
- ✅ Arquivo `.env` para desenvolvimento
- ✅ 227 testes passando
- ✅ Cobertura de testes: 77%+

### 🐛 Corrigido
- ✅ Erro `unable to determine transport target for "pino-pretty"`
- ✅ Paths incorretos em testes de integração
- ✅ Erro de sintaxe em `AuthController.test.js`

## [2.0.0] - 2026-02-21

### ✨ Adicionado
- ✅ Refatoração completa para arquitetura MVC
- ✅ Separação de routers em módulos independentes (`home.js`, `phases.js`, `tips.js`)
- ✅ Controller centralizado (`PhaseController.js`) para lógica de renderização
- ✅ Configuração centralizada de fases (`src/config/phases.js`)
- ✅ Middleware modular para segurança (`Helmet`, `Compression`, `Cache Headers`)
- ✅ Middleware de logging customizado
- ✅ Tratamento de erros global
- ✅ Script para gerar templates de fases faltantes (`scripts/generate-missing-phases.js`)
- ✅ Templates para fases faltantes (10, 13, 15, etc.)
- ✅ Documentação completa do projeto
- ✅ Configuração de ambiente (`src/config/config.js`)
- ✅ Suporte a rotas legadas (compatibilidade com versão anterior)

### 🔒 Segurança
- ✅ Implementado Helmet.js para headers HTTP de segurança
- ✅ Compressão Gzip automática em respostas
- ✅ Controle de cache inteligente
- ✅ Proteção contra XSS, CSRF, Clickjacking
- ✅ Validação de parâmetros de entrada
- ✅ Rate limiting preparado para implementação futura

### 🔄 Modificado
- 🔄 Migração de `express@5.2.1` → `express@4.21.0 LTS` (mais estável)
- 🔄 Migração de `ejs@4.0.1` → `ejs@3.1.10` (versão estável)
- 🔄 Migração de `node@21.x` → `node@20.x/22.x LTS`
- 🔄 Refatoração completa de `server.js` (412 linhas → estrutura modular)
- 🔄 Eliminação de rotas duplicadas (150+ rotas colapsadas em routers dinâmicos)
- 🔄 Atualização do `package.json` com metadados completos

### ⚡ Performance
- ✅ Compressão Gzip automática
- ✅ Cache de assets estáticos (30 dias)
- ✅ Pré-carregamento de templates críticos em memória
- ✅ Middleware otimizado
- ✅ Trust Proxy configurado
- ✅ ETag desativado em assets estáticos (controle manual de cache)

### 🐛 Corrigido
- ✅ Removidas dependências problemáticas
- ✅ Corrigidas inconsistências de rotas legadas
- ✅ Resolvido problema de duplicação de código
- ✅ Tratamento consistente de erros 404

### 📚 Documentação
- ✅ README.md completamente reescrito
- ✅ Documentação de arquitetura
- ✅ Guia de desenvolvimento
- ✅ Instruções de instalação e uso
- ✅ Tabela de dependências
- ✅ Troubleshooting

### ⚠️ Breaking Changes
- `express@5.x` não é mais suportado (migrado para `4.21.0 LTS`)
- `node@21.x` não é mais suportado (requer `20.x` ou `22.x LTS`)
- Rota de API mudou para `/fase/api/list` (antes não existia)

## [1.0.2] - 2024

### Adicionado
- Versão inicial refatorada do projeto original
- Migração para Node.js e Express
- Sistema de fases com EJS

### Notas
- Código altamente repetitivo com 150+ rotas individuais
- Dependências desatualizadas
- Falta de padrões de design

---

## Convenções de Versioning

- **MAJOR**: Mudanças incompatíveis na API
- **MINOR**: Novo recurso compatível com versões anteriores
- **PATCH**: Correção de bug compatível com versões anteriores

Exemplos:
- `v2.0.0` - Refatoração major (breaking changes)
- `v2.1.0` - Nova fase adicionada
- `v2.0.1` - Corrige bug em fase existente

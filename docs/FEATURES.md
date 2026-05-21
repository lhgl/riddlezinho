# ✨ Features - RiddleZinho v3.2.0

## Core Features

### 1. PostgreSQL + Prisma ORM
- PostgreSQL 16 em produção via `DATABASE_URL`
- Sem `DATABASE_URL` → in-memory (testes e dev local sem dependências)
- Prisma 5.x com migrations automáticas
- Modelos: User, UserScore, Achievement, UserAchievement

### 2. JWT Authentication
- Token-based auth
- Expiration: 24 hours
- Secure password hashing (bcryptjs 10 rounds)
- Auto-refresh capability

### 3. Rate Limiting
```
General:  500 requisições / 15 minutos por IP
Login:    10 tentativas / 15 minutos
API:      200 requisições / 1 minuto
```

### 4. Leaderboard
- Global ranking by score
- Auto-calculated levels (1 level per 10 phases)
- Pagination support
- Real-time updates

### 5. Logging Estruturado
- Pino logger with JSON output
- UUID per request
- UserId tracking
- Performance metrics

### 6. Security
- Helmet.js (headers, CSP, HSTS)
- CORS configured
- Input validation
- Prepared statements (PostgreSQL/Prisma)
- Rate limiting
- JWT protection

### 7. Performance
- Gzip compression
- Connection pooling (Prisma)
- Caching headers
- < 100ms response time

### 8. Docker Support
- Multi-stage production image (builder + runner)
- Docker Compose (PostgreSQL 16)
- docker-compose.dev.yml para desenvolvimento local
- Health checks incluídos
- One-click deploy via render.yaml (Render.com)

### 9. Dark Mode
- Toggle persistido em localStorage
- CSS custom properties (`--bg`, `--text`, `--surface`, `--border`, `--primary`)
- Respeita preferência do sistema (`prefers-color-scheme`)
- Transição suave

### 10. Toast Notifications
- Feedback visual para sucesso, erro e informação
- Slide-in/out animado
- Auto-remove após 3 segundos
- Substitui `alert()` nativos

### 11. Loading States
- Spinner overlay ao submeter formulários
- Binds automáticos via `data-loading` attribute

### 12. Mobile Responsive
- Breakpoint 768px com media queries
- Leaderboard: tabela → cards empilhados em mobile
- Formulários 100% width
- Header adaptado

### 13. Achievements System
- 5 conquistas/badges por marcos de fases completadas:
  - 🌱 Iniciante (1 fase)
  - 📚 Aprendiz (10 fases)
  - ⚔️ Veterano (25 fases)
  - 👑 Mestre (50 fases)
  - 🏆 LENDA (99 fases)
- Retornadas em `newAchievements` ao completar fase
- Página de conquistas em `/achievements`

### 14. Daily Challenge
- Fase do dia determinística (mesma para todos os jogadores no mesmo dia)
- Calculado via `dayOfYear % totalPhases` (sem estado persistido)
- Acessível em `/achievements/daily`

---

## Technical Stack

```
Frontend:  EJS, HTML5, CSS3, JavaScript
Backend:   Node.js 20.x, Express.js 4.21.0, TypeScript 5.6
Database:  PostgreSQL 16 + Prisma ORM 5.x (in-memory em dev/testes)
Auth:      JWT + bcryptjs
Testing:   Jest 29.x — 410+ testes
DevOps:    Docker, GitHub Actions, Render.com
Logging:   Pino 8.x
Security:  Helmet.js 7.x
```

---

## Test Coverage

```
Unit Tests:        320+
Integration:       60+
Extended:          30+
Total:             410+
Coverage:          83%+
```

---

**Versão**: 3.2.0 | **Status**: Production Ready

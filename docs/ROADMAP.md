# 🚀 Roadmap - RiddleZinho

## Versões Concluídas

### v2.5.0 ✅ — TypeScript + Design Patterns
**Concluída**: Fevereiro 2026

- Migração completa para TypeScript
- Controllers, Services, Repositories com tipagem forte
- 327 testes passando, cobertura 83%+
- User Progress Badge funcional
- ESLint strict mode

---

### v3.0.0 ✅ — Production Foundation
**Concluída**: Maio 2026

- PostgreSQL 16 + Prisma ORM (substitui Oracle)
- RepositoryFactory: `DATABASE_URL` → Prisma | sem URL → InMemory
- docker-compose.yml reescrito (PostgreSQL 16-alpine)
- Dockerfile multi-stage (builder + runner)
- render.yaml — deploy one-click no Render.com
- DI em server.ts via factory
- docs/DEPLOY.md — guia completo de produção
- Graceful shutdown + health check com `db: postgres | memory`

---

### v3.1.0 ✅ — UX/UI
**Concluída**: Maio 2026

- Dark mode com persistência em localStorage
- Toast notifications (slide-in animado)
- Loading spinner overlay
- Mobile responsive (breakpoint 768px)

---

### v3.2.0 ✅ — Features: Achievements + Daily Challenge
**Concluída**: Maio 2026

- AchievementService: 5 badges (Iniciante/Aprendiz/Veterano/Mestre/LENDA)
- DailyChallengeService: fase do dia determinística
- Rotas `/achievements`, `/achievements/me`, `/achievements/daily`
- `newAchievements` retornado em `POST /auth/complete-phase`
- Views: achievements.ejs, daily.ejs
- 410+ testes passando

---

## Próximas Versões

### v3.3.0 — Advanced (Planejado)

- [ ] WebSockets para leaderboard em tempo real
- [ ] Redis para rate limiting distribuído (escala horizontal)
- [ ] PWA (Service Worker, offline mode)
- [ ] Testes E2E (Playwright)

### v4.0.0 — SPA + API Pública (Futuro)

- [ ] Frontend SPA separado (React/Vue)
- [ ] API pública RESTful + OpenAPI/Swagger
- [ ] Multi-idioma (i18n)
- [ ] Webhooks para integrações

---

**Versão atual**: 3.2.0 | **Atualizado**: Maio 2026

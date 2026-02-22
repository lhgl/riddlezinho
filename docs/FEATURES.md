# ✨ Features - RiddleZinho v2.2.0

## Core Features

### 1. Oracle Database Integration
- Connection pooling
- Prepared statements (SQL injection safe)
- User authentication with bcryptjs
- Score persistence

### 2. JWT Authentication
- Token-based auth
- Expiration: 24 hours
- Secure password hashing (bcryptjs 10 rounds)
- Auto-refresh capability

### 3. Rate Limiting
```
General:  100 requisições / 15 minutos por IP
Login:    5 tentativas / 15 minutos
API:      50 requisições / 1 minuto
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
- Prepared statements
- Rate limiting
- JWT protection

### 7. Performance
- Gzip compression
- Connection pooling
- Caching headers
- < 100ms response time

### 8. Docker Support
- Production-ready image
- Docker Compose for local dev
- Health checks included

---

## Technical Stack

```
Frontend:  EJS, HTML5, CSS3, JavaScript
Backend:   Node.js 20.x, Express.js 4.21.0
Database:  Oracle 12c+ with pooling
Auth:      JWT + bcryptjs
Testing:   Jest 29.x
DevOps:    Docker, GitHub Actions
Logging:   Pino 8.x
Security:  Helmet.js 7.x
```

---

## Test Coverage

```
Unit Tests:        50+
Integration:       20+
Security Tests:    15+
Total Coverage:    95%+
```

---

**Versão**: 2.2.0 | **Status**: Production Ready

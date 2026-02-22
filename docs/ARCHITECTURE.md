# 🏗️ Arquitetura - RiddleZinho v2.5.0

## Visão Geral

RiddleZinho é uma aplicação web TypeScript/Node.js para jogo de charadas interativo.

### Stack Tecnológico

```
Frontend:
├─ EJS (templates)
├─ HTML5 / CSS3
└─ JavaScript vanilla

Backend:
├─ TypeScript 5.6
├─ Node.js 20.x LTS
├─ Express.js 4.21.0
├─ JWT (autenticação)
├─ bcryptjs (hash de senhas)
└─ Pino (logging)

Testes:
├─ Jest 29.x
├─ ts-jest
└─ Supertest
```

---

## Estrutura do Projeto

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
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── integration/
├── dist/                     # JavaScript compilado
├── views/                    # Templates EJS (271 fases)
├── public/                   # Arquivos estáticos
├── tsconfig.json            # Configuração TypeScript
├── package.json
└── README.md
```

---

## Componentes Principais

### 1. Server (server.ts)

Ponto de entrada da aplicação.

```typescript
// Configura Express
// Registra middlewares
// Inicializa rotas
// Inicia servidor HTTP
```

**Responsabilidades:**
- Configurar Express
- Registrar middlewares (security, logging, rateLimit)
- Carregar rotas
- Iniciar servidor na porta configurada

### 2. Config (config/)

#### config.ts
Configurações de ambiente.

```typescript
interface Config {
  nodeEnv: string;
  port: number | string;
  trustProxy: number | string;
  logLevel: string;
  // ...
}
```

#### phases.ts
Configuração das 99 fases do jogo.

```typescript
interface Phase {
  id: string;
  number: number;
  level: number;
  name: string;
  type: string;
  image: string | null;
  hint: string;
}
```

### 3. Controllers (controllers/)

#### AuthController.ts
Gerencia autenticação e leaderboard.

**Endpoints:**
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Login
- `GET /auth/profile` - Obter perfil
- `PUT /auth/profile` - Atualizar perfil
- `POST /auth/complete-phase` - Completar fase
- `GET /auth/leaderboard` - Leaderboard global
- `GET /auth/leaderboard/me` - Leaderboard com rank do usuário

#### PhaseController.ts
Renderiza fases do jogo.

**Métodos:**
- `renderPhase()` - Renderiza uma fase
- `renderIndex()` - Página inicial
- `renderGame()` - Página de jogo
- `renderTip()` - Página de dica
- `getPhasesList()` - Lista de fases (JSON)
- `getPhaseData()` - Dados de uma fase (JSON)

### 4. Middleware (middleware/)

#### security.ts
Headers de segurança e compressão.

```typescript
getSecurityMiddleware(): Array<Middleware>
// - compression()
// - helmet()
// - cache control
```

#### rateLimit.ts
Rate limiting para proteger contra abuso.

```typescript
generalLimiter: 100 req / 15 min
loginLimiter: 5 req / 15 min
apiLimiter: 50 req / 1 min
```

#### errorHandler.ts
Tratamento de erros.

```typescript
notFoundHandler(req, res)  // 404
errorHandler(err, req, res) // 500
```

### 5. Routes (routes/)

#### home.ts
Rotas principais.

```typescript
GET /          → renderIndex()
GET /jogar     → renderGame()
GET /login     → render('login')
GET /leaderboard → render('leaderboard')
```

#### auth.ts
Rotas de autenticação.

```typescript
POST /auth/register      → AuthController.register
POST /auth/login         → AuthController.login
GET  /auth/profile       → AuthController.getProfile (auth)
PUT  /auth/profile       → AuthController.updateProfile (auth)
POST /auth/complete-phase → AuthController.completePhase (auth)
GET  /auth/leaderboard   → AuthController.getLeaderboard
GET  /auth/leaderboard/me → AuthController.getLeaderboardWithUserRank (auth)
```

#### phases.ts
Rotas de fases.

```typescript
GET /fase/:phaseId       → renderPhase()
GET /fase/api/list       → getPhasesList()
GET /fase/api/phase/:id  → getPhaseData()
```

### 6. Utils (utils/)

#### auth.ts
Funções de autenticação.

```typescript
register(username, email, password): Promise<User>
login(username, password): Promise<LoginResult>
verifyToken(token): JWTPayload
authenticate(req, res, next): void
getUser(userId): User | null
updateUserProfile(userId, updates): User | null
```

#### logger.ts
Logger estruturado com Pino.

```typescript
logEvent(eventName, data): void
logError(eventName, error, data): void
logWarn(eventName, data): void
httpLogger: Middleware
addRequestMetadata: Middleware
```

---

## Fluxo de Requisição

```
┌─────────────┐
│   Cliente   │
│  (Browser)  │
└──────┬──────┘
       │ HTTP Request
       ▼
┌─────────────────────────┐
│  Security Middleware    │ ← helmet, compression
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  Logging Middleware     │ ← pino-http
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  Rate Limit Middleware  │ ← express-rate-limit
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  Route Matching         │ ← Express Router
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  Controller             │ ← AuthController, PhaseController
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  Utils/Services         │ ← auth.ts, logger.ts
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  Response               │ ← JSON ou EJS render
└─────────────────────────┘
```

---

## Armazenamento de Dados

### Em Memória (Desenvolvimento)

```typescript
// Usuários
users: Map<string, User>

// Leaderboard
leaderboard: Map<string, UserScore>

// Tokens
tokens: Map<string, string>
```

### Produção (Futuro)

```
PostgreSQL:
├─ users
├─ phases
└─ scores

Redis:
├─ sessions
└─ cache
```

---

## Segurança

### Implementado

✅ **Headers (Helmet.js)**
- XSS Filter
- NoSniff
- Frameguard (DENY)
- Referrer Policy

✅ **Autenticação**
- JWT com expiração (24h)
- Senhas hasheadas (bcryptjs, 10 rounds)
- Middleware authenticate

✅ **Rate Limiting**
- Geral: 100 req/15 min
- Login: 5 req/15 min
- API: 50 req/1 min

✅ **Logging**
- Request ID único
- User ID rastreado
- Timestamp em cada log

---

## Testes

### Estrutura

```
tests/
├── unit/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── utils/
└── integration/
```

### Configuração

```json
{
  "preset": "ts-jest",
  "testMatch": [
    "**/tests/**/*.test.js",
    "**/tests/**/*.test.ts"
  ],
  "transform": {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest"
  }
}
```

### Cobertura

```
Test Suites: 17 passed
Tests:       323 passed

Statements   : 95%+
Branches     : 85%+
Functions    : 95%+
Lines        : 95%+
```

---

## Build e Deploy

### Desenvolvimento

```bash
# Compilar TypeScript (watch mode)
npm run build -- --watch

# Iniciar servidor
npm run dev
```

### Produção

```bash
# Compilar
npm run build

# Iniciar
npm start
```

### Docker

```bash
# Build
docker build -t riddlezinho:2.5.0 .

# Run
docker run -p 5000:5000 riddlezinho:2.5.0
```

---

## Tipos e Interfaces

### Phase

```typescript
interface Phase {
  id: string;
  number: number;
  level: number;
  name: string;
  type: string;
  image: string | null;
  hint: string;
  missing?: boolean;
}
```

### User

```typescript
interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  lastLogin: Date | null;
  preferences: {
    language: string;
    notifications: boolean;
  };
}
```

### UserScore

```typescript
interface UserScore {
  userId: string;
  username: string;
  score: number;
  completedPhases: number;
  level: number;
  timeSpent: number;
  completedPhasesList?: string[];
  lastUpdate: Date;
}
```

---

## Configuração TypeScript

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

---

## Version

**v2.5.0** | **TypeScript 5.6** | **Node.js 20.x**

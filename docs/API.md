# 📡 API Reference - RiddleZinho v2.5.0

## Base URL

```
http://localhost:5000
```

---

## 🔐 Autenticação

### Register

```http
POST /auth/register
Content-Type: application/json

{
  "username": "player",
  "email": "player@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```

**Response (201):**

```json
{
  "message": "Usuário registrado com sucesso",
  "user": {
    "id": "550e8400-...",
    "username": "player",
    "email": "player@example.com"
  }
}
```

**Response (400):**

```json
{
  "error": "Username, email e password são obrigatórios"
}
```

---

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "username": "player",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "message": "Login realizado com sucesso",
  "user": {
    "id": "550e8400-...",
    "username": "player",
    "email": "player@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (401):**

```json
{
  "error": "Usuário ou senha inválidos"
}
```

---

### Get Profile

```http
GET /auth/profile
Authorization: Bearer {token}
```

**Response (200):**

```json
{
  "user": {
    "id": "550e8400-...",
    "username": "player",
    "email": "player@example.com",
    "stats": {
      "userId": "550e8400-...",
      "username": "player",
      "score": 300,
      "completedPhases": 3,
      "level": 0,
      "timeSpent": 360
    }
  }
}
```

---

### Update Profile

```http
PUT /auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "preferences": {
    "language": "pt-BR",
    "notifications": false
  }
}
```

**Response (200):**

```json
{
  "message": "Perfil atualizado com sucesso",
  "user": {
    "id": "550e8400-...",
    "username": "player",
    "email": "player@example.com",
    "preferences": {
      "language": "pt-BR",
      "notifications": false
    }
  }
}
```

---

## 🎮 Game

### Complete Phase

```http
POST /auth/complete-phase
Authorization: Bearer {token}
Content-Type: application/json

{
  "phaseId": "coracao",
  "timeSpent": 120,
  "score": 100
}
```

**Response (200):**

```json
{
  "message": "Fase concluída com sucesso",
  "stats": {
    "userId": "550e8400-...",
    "username": "player",
    "score": 400,
    "completedPhases": 4,
    "level": 0,
    "timeSpent": 480,
    "completedPhasesList": ["coracao", "14bis", "bobesponja", "jesus"]
  }
}
```

---

### Get Leaderboard

```http
GET /auth/leaderboard?limit=10&page=1
```

**Response (200):**

```json
{
  "leaderboard": [
    {
      "userId": "550e8400-...",
      "username": "player1",
      "score": 5000,
      "completedPhases": 50,
      "level": 5,
      "rank": 1
    },
    {
      "userId": "660e8400-...",
      "username": "player2",
      "score": 4500,
      "completedPhases": 45,
      "level": 4,
      "rank": 2
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

---

### Get Leaderboard with User Rank

```http
GET /auth/leaderboard/me
Authorization: Bearer {token}
```

**Response (200):**

```json
{
  "leaderboard": [
    {
      "userId": "550e8400-...",
      "username": "player1",
      "score": 5000,
      "completedPhases": 50,
      "rank": 1
    }
    // ... top 10
  ],
  "userRank": 15,
  "userStats": {
    "userId": "770e8400-...",
    "username": "currentuser",
    "score": 2500,
    "completedPhases": 25,
    "level": 2
  }
}
```

---

## 📚 Phases

### Get Phase List

```http
GET /fase/api/list
```

**Response (200):**

```json
{
  "total": 99,
  "phases": [
    {
      "id": "fasezero",
      "number": 0,
      "level": 0,
      "name": "Fase Zero - Bem-vindo",
      "hasImage": false,
      "missing": false
    },
    {
      "id": "coracao",
      "number": 1,
      "level": 1,
      "name": "Fase 1 - Trocadilho fuleiro",
      "hasImage": true,
      "missing": false
    }
  ]
}
```

---

### Get Phase Data

```http
GET /fase/api/phase/:phaseId
```

**Response (200):**

```json
{
  "id": "coracao",
  "number": 1,
  "level": 1,
  "name": "Fase 1 - Trocadilho fuleiro",
  "type": "passcode",
  "image": "/images/fases/aviao.jpg",
  "hint": "Santos Dumont"
}
```

**Response (404):**

```json
{
  "error": "Fase não encontrada"
}
```

---

## 🏠 Home

### Get Index

```http
GET /
```

**Response (200):**

HTML renderizado (EJS template)

---

### Get Game Page

```http
GET /jogar
```

**Response (200):**

HTML renderizado (EJS template)

---

### Get Login Page

```http
GET /login
```

**Response (200):**

HTML renderizado (EJS template)

---

### Get Leaderboard Page

```http
GET /leaderboard
```

**Response (200):**

HTML renderizado (EJS template)

---

## 🔍 Health Check

```http
GET /health
```

**Response (200):**

```json
{
  "status": "ok",
  "timestamp": "2026-02-22T10:30:00.000Z",
  "uptime": 12345.67
}
```

---

## ⚠️ Error Responses

### 400 Bad Request

```json
{
  "error": "Username, email e password são obrigatórios"
}
```

### 401 Unauthorized

```json
{
  "error": "Token não fornecido"
}
```

### 404 Not Found

```json
{
  "error": "Fase não encontrada"
}
```

### 429 Too Many Requests

```json
{
  "error": "Muitas requisições. Tente novamente mais tarde."
}
```

### 500 Internal Server Error

```json
{
  "error": "Erro ao obter leaderboard"
}
```

---

## 🔒 Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| Geral | 100 req | 15 min |
| /auth/login | 5 req | 15 min |
| /auth/* (API) | 50 req | 1 min |

**Headers:**

```
RateLimit-Limit: 100
RateLimit-Remaining: 95
RateLimit-Reset: 1645523400
```

---

## 🔑 Authentication

### JWT Token

Tokens JWT expiram em 24 horas.

**Header:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Payload:**

```json
{
  "userId": "550e8400-...",
  "username": "player",
  "email": "player@example.com",
  "iat": 1645523400,
  "exp": 1645609800
}
```

---

**Versão**: 2.5.0 | **TypeScript** | **Atualizado**: Fevereiro 2026

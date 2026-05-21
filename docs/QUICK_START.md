# 🚀 Quick Start - RiddleZinho v3.2.0

## 5 Minutos para Começar

### Pré-requisitos

- Node.js 20.x ou superior
- npm 9.x ou superior

### Passo 1: Clonar Repositório

```bash
git clone https://github.com/lhgl/riddlezinho.git
cd riddlezinho
```

### Passo 2: Instalar Dependências

```bash
npm install
```

### Passo 3: Compilar TypeScript

```bash
npm run build
```

### Passo 4: Rodar Testes (Opcional)

```bash
npm test
```

### Passo 5: Iniciar Servidor

```bash
npm start
```

### Passo 6: Acessar

```
http://localhost:5000
```

---

## Comandos Úteis

### Desenvolvimento

```bash
# Compilar com watch mode
npm run build -- --watch

# Iniciar em modo desenvolvimento
npm run dev

# Rodar testes em watch mode
npm run test:watch
```

### Produção

```bash
# Build otimizado
npm run build

# Iniciar servidor
npm start
```

### Testes

```bash
# Todos os testes
npm test

# Com coverage
npm test -- --coverage

# Testes específicos
npm test -- --testNamePattern="auth"
```

### Lint

```bash
npm run lint
```

---

## Docker (Opcional)

### Build

```bash
docker build -t riddlezinho:3.2.0 .
```

### Run

```bash
docker run -p 5000:5000 riddlezinho:3.2.0
```

### Docker Compose

```bash
docker-compose up
```

---

## Variáveis de Ambiente

Copie `.env.example` para `.env`:

```bash
cp .env.example .env
```

### Opções

```bash
# Ambiente
NODE_ENV=development

# Servidor
PORT=5000
HOST=localhost

# Segurança
JWT_SECRET=sua-chave-secreta
JWT_EXPIRE=24h

# Logging
LOG_LEVEL=info
```

---

## Primeiros Passos no Jogo

1. **Acesse**: http://localhost:5000
2. **Clique em "Jogar"**
3. **Resolva a Fase Zero**
4. **Avance para as próximas fases**

### Opcional: Criar Conta

1. Acesse: http://localhost:5000/login
2. Clique em "Registro"
3. Preencha os dados
4. Faça login
5. Seu progresso será salvo no leaderboard

---

## Troubleshooting

### Porta já em uso

```bash
PORT=3000 npm start
```

### Erros de compilação

```bash
# Limpar dist
rm -rf dist/

# Reinstalar dependências
npm install

# Recompilar
npm run build
```

### Testes falhando

```bash
# Limpar cache
npm test -- --clearCache

# Rodar testes novamente
npm test
```

---

## Próximos Passos

- [docs/ARCHITECTURE.md](ARCHITECTURE.md) - Entenda a arquitetura
- [docs/API.md](API.md) - Endpoints da API
- [docs/USER_GUIDE.md](USER_GUIDE.md) - Guia completo do jogo
- [docs/CONTRIBUTING.md](CONTRIBUTING.md) - Como contribuir

---

**Versão**: 3.2.0 | **TypeScript** | **Node.js 20.x**

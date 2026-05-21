# Guia de Deploy em Produção — RiddleZinho

## Arquitetura

```
Clientes
   │
   ▼
Nginx (Load Balancer)
   │
   ├──► Instância Node.js 1 (porta 5000)
   ├──► Instância Node.js 2 (porta 5001)
   └──► Instância Node.js N (porta 500N)
            │
            ▼
       PostgreSQL 16
```

A aplicação é **stateless**: autenticação via JWT (sem sessão no servidor), o que permite rodar N réplicas sem compartilhar estado.

---

## Variáveis de Ambiente

| Variável | Obrigatório | Padrão | Descrição |
|---|---|---|---|
| `DATABASE_URL` | Em produção | — | `postgresql://USER:PASS@HOST:5432/DB` |
| `JWT_SECRET` | Sim | `change-me` | Segredo para assinar tokens JWT |
| `NODE_ENV` | Não | `development` | `production` desativa logs de debug |
| `PORT` | Não | `5000` | Porta que o servidor escuta |
| `JWT_EXPIRES_IN` | Não | `24h` | Tempo de expiração do token |

> Sem `DATABASE_URL`: a aplicação usa armazenamento InMemory (dados perdidos ao reiniciar). Use apenas em desenvolvimento.

---

## Deploy no Render.com (recomendado — gratuito)

1. Faça fork do repositório no GitHub.
2. Acesse [render.com](https://render.com) e crie uma conta.
3. Clique em **New** → **Blueprint** e aponte para o repositório.
4. O `render.yaml` na raiz do projeto configura automaticamente:
   - Web service Node.js
   - PostgreSQL free tier
   - `JWT_SECRET` gerado automaticamente
5. Clique em **Deploy**. O Render faz build, migrations e start automaticamente.
6. A URL pública fica disponível em `https://riddlezinho.onrender.com` (ou similar).

---

## Deploy com Docker Compose (VPS / servidor próprio)

### Pré-requisitos
- Docker 24+ e Docker Compose v2+
- Portas 80/443 abertas

### Passos

```bash
# 1. Clonar repositório
git clone https://github.com/lhgl/riddlezinho.git
cd riddlezinho

# 2. Configurar variáveis
cp .env.example .env
# Editar .env com seus valores reais (JWT_SECRET forte, DB_PASSWORD seguro)

# 3. Subir containers
docker compose up -d --build

# 4. Verificar health
curl http://localhost:5000/health
# {"status":"ok","db":"postgres"}
```

### Parar
```bash
docker compose down          # mantém volumes (dados)
docker compose down -v       # remove volumes (apaga dados!)
```

---

## Deploy no Railway

```bash
npm install -g @railway/cli
railway login
railway init
railway add --database postgresql
railway up
```

Railway detecta o `package.json` automaticamente, injeta `DATABASE_URL` e executa `npm run build && npm start`.

---

## Escalonamento Horizontal (Docker Swarm)

Para múltiplas réplicas com zero downtime:

```yaml
# docker-compose.yml — adicionar no serviço `app`:
deploy:
  replicas: 3
  update_config:
    parallelism: 1
    delay: 10s
  restart_policy:
    condition: on-failure
```

```bash
docker swarm init
docker stack deploy -c docker-compose.yml riddlezinho
# Escalar:
docker service scale riddlezinho_app=5
```

---

## Nginx como Load Balancer

```nginx
upstream riddlezinho {
    least_conn;
    server app1:5000 max_fails=3 fail_timeout=30s;
    server app2:5000 max_fails=3 fail_timeout=30s;
    server app3:5000 max_fails=3 fail_timeout=30s;
}

server {
    listen 80;
    server_name riddlezinho.com;

    location / {
        proxy_pass http://riddlezinho;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /health {
        proxy_pass http://riddlezinho;
        access_log off;
    }
}
```

---

## PostgreSQL Connection Pooling

O Prisma ORM gerencia um pool de conexões interno. Para alta concorrência, configure na `DATABASE_URL`:

```
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=20&pool_timeout=20"
```

| Parâmetro | Padrão | Recomendado (produção) |
|---|---|---|
| `connection_limit` | 10 | 20–50 (depende do plano PG) |
| `pool_timeout` | 10s | 20s |

---

## Limitações e Observações

- **Rate limiting** é por instância (in-memory). Em múltiplas réplicas, use Redis como backend (planejado para v3.3.0).
- **Sessions**: não há sessões no servidor — autenticação 100% via JWT stateless.
- **Assets estáticos**: servidos pelo Node.js com cache `30d`. Para produção de alta escala, use CDN.

---

## Monitoramento

### Health Check
```bash
curl https://app.com/health
# {"status":"ok","timestamp":"...","uptime":1234,"db":"postgres"}
```

### Logs (Pino JSON)
```bash
# Produção — filtrar com pino-pretty:
node dist/server.js | npx pino-pretty

# Docker:
docker compose logs -f app | npx pino-pretty

# Integração com Datadog / Logtail: configurar LOG_LEVEL=info
```

---

## Migrations em Produção

As migrations são executadas automaticamente ao iniciar via Docker ou Render (`prisma migrate deploy`). Para executar manualmente:

```bash
DATABASE_URL="postgresql://..." npx prisma migrate deploy
```

> `migrate deploy` é seguro para produção: aplica apenas migrations pendentes, nunca dropa dados.

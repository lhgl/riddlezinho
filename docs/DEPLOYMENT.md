# 🚀 Deployment - RiddleZinho v2.2.0

## Production Checklist

- [ ] Node.js 20.x LTS installed
- [ ] .env.production configured
- [ ] Oracle Database setup (oracle_schema.sql)
- [ ] SSL/TLS certificate ready
- [ ] Reverse proxy (Nginx/Apache) configured

## Docker Deployment

### Build Image
```bash
docker build -t riddlezinho:2.1.1 .
```

### Push to Registry
```bash
docker tag riddlezinho:2.1.1 yourregistry/riddlezinho:2.1.1
docker push yourregistry/riddlezinho:2.1.1
```

### Run Container
```bash
docker run -d \
  --name riddlezinho \
  -p 5000:5000 \
  -e NODE_ENV=production \
  -e ORACLE_HOST=your-host \
  -e ORACLE_USER=your-user \
  -e ORACLE_PASSWORD=your-password \
  -e JWT_SECRET=your-secret \
  riddlezinho:2.1.1
```

## Environment Configuration

Create `.env.production`:
```
NODE_ENV=production
PORT=5000
ORACLE_HOST=db.example.com
ORACLE_PORT=1521
ORACLE_USER=riddlezinho_user
ORACLE_PASSWORD=secure_password
ORACLE_DB=ORCL
JWT_SECRET=your-super-secret-key
LOG_LEVEL=warn
```

## Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name riddlezinho.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## PM2 (Process Manager)

```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start server.js --name "riddlezinho" --env production

# Restart on reboot
pm2 startup
pm2 save
```

## Health Monitoring

```bash
# Check health
curl https://riddlezinho.com/health

# Check logs
pm2 logs riddlezinho
```

---

**Version**: 2.2.0 | **Status**: Production Ready

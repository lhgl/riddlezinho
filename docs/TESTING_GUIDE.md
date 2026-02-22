# 🧪 Testing Guide - RiddleZinho v2.2.0

## Quick Test (5 min)

```bash
npm install
npm test
npm start
curl http://localhost:5000/health
```

## Full Testing (90 min)

### Test 1: Installation (5 min)
```bash
npm install
npm start
curl http://localhost:5000/health  # Should return 200
```

### Test 2: Authentication (10 min)

Register:
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testplayer",
    "email": "test@example.com",
    "password": "Test123!",
    "passwordConfirm": "Test123!"
  }'
```

Login:
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testplayer",
    "password": "Test123!"
  }'
```

### Test 3: Play Game (15 min)
1. Open: http://localhost:5000
2. Register
3. Login
4. Click "Jogar"
5. Solve phase "coracao" (resposta: "14bis")
6. Check leaderboard

### Test 4: Leaderboard (5 min)
```bash
curl http://localhost:5000/auth/leaderboard
```

### Test 5: Security (10 min)

Rate limiting (6ª tentativa deve dar 429):
```bash
for i in {1..6}; do
  curl -X POST http://localhost:5000/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username":"user","password":"pass"}'
done
```

### Test 6: Automated Tests (5 min)
```bash
npm test              # Should pass 85+
npm test -- --coverage # Should show 95%+
```

### Test 7: Docker (10 min)
```bash
docker build -t riddlezinho:2.1.1 .
docker run -p 5000:5000 riddlezinho:2.1.1
curl http://localhost:5000/health
```

---

## Troubleshooting

| Error | Solution |
|-------|----------|
| Port 5000 in use | `PORT=3000 npm start` |
| oracledb not found | `npm install oracledb` |
| Tests fail | `npm test -- --verbose` |
| Oracle connection failed | Use local mode (skip DB) |

---

**Version**: 2.2.0 | **Status**: Ready for Testing

# 📖 User Guide - RiddleZinho v3.2.0

## 🎮 Como Jogar

### Entender o Jogo

RiddleZinho é uma série de **charadas em corrente**:

```
Fase "coracao"
├─ Charada: "Inventor paulista"
├─ Resposta: "14bis"
│  (Esta é o ID da próxima fase!)
│
Fase "14bis"
├─ Charada: "Máquina voadora"
└─ Resposta: "aviao"
  (Esta é o ID da próxima fase!)
```

### Primeiros Passos

1. **Registre-se**: Clique em "Registrar"
2. **Faça login**: Use suas credenciais
3. **Clique em "Jogar"**: Inicie o jogo
4. **Resolva fases**: Digite a resposta em minúsculas

### Sistema de Pontuação

- **Pontos por fase**: 100 pontos
- **Nível**: 1 nível a cada 10 fases
- **Leaderboard**: Veja seu ranking global
- **Tempo**: Rastreado automaticamente

### Níveis

```
Nível 1 (Fases 0-33):  Fácil a Médio
Transição (Fase 34):   Senha requerida
Nível 2 (Fases 35+):   Médio a Difícil
```

### Dicas

- ❓ Leia a charada com atenção
- 💡 Use a dica se ficar preso
- 🔍 Pense fora da caixa
- 📱 A resposta sempre é simples (sem espaços, acentos)

---

## 👤 Perfil e Leaderboard

### Ver Seu Perfil

```bash
curl http://localhost:5000/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ver Leaderboard Global

```bash
curl http://localhost:5000/auth/leaderboard

# Ou no navegador:
http://localhost:5000/auth/leaderboard
```

### Seu Ranking

```bash
curl http://localhost:5000/auth/leaderboard/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📊 Estatísticas

Seu perfil mostra:
- ✅ Fases completadas
- 🏆 Score total
- 📈 Nível atual
- ⏱️ Tempo dedicado
- 📅 Último acesso

---

## 🆘 Ajuda

### Esqueceu a Senha?

Crie uma nova conta com outro email.

### Encontrou um Bug?

Reporte em: https://github.com/lhgl/riddlezinho/issues

### Precisa de Ajuda?

Veja [TESTING_GUIDE.md](TESTING_GUIDE.md) para troubleshooting

---

**Versão**: 3.2.0 | **Atualizado**: Maio 2026

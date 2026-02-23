# Workflow CI/CD - RiddleZinho

## Visão Geral

O workflow CI/CD foi simplificado para focar no essencial e rodar apenas na branch **master**.

---

## 📋 Configuração Atual

### Branches Monitoradas
- **Push:** Apenas na branch `master`
- **Pull Request:** Apenas para `master`

### Jobs do Pipeline

| Job | Nome | Descrição | Tempo Máximo |
|-----|------|-----------|--------------|
| 1 | 🔍 Code Quality & SonarCloud | Lint, testes, build e análise SonarCloud | 15 min |
| 2 | 🧪 Tests | Testes e validação de coverage | 15 min |
| 3 | 🏗️ Build & Docker | Build e push da imagem Docker | 15 min |
| 4 | 🚀 Deploy | Deploy em produção (apenas master) | 10 min |

---

## 🔄 Fluxo do Pipeline

```
┌─────────────────────┐
│   Push/PR master    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Quality Analysis   │ ◄─── SonarCloud Scan
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Tests & Coverage   │ ◄─── 80% min coverage
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Build & Docker     │ ◄─── Push para GHCR
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Deploy (master)    │ ◄─── Apenas push na master
└─────────────────────┘
```

---

## 🚀 O Que Foi Removido

### Jobs Removidos
- ❌ **Documentation Check** - Validação de README e changelog
- ❌ **Performance Check** - Análise de bundle size
- ❌ **Summary Job** - Geração de relatório consolidado
- ❌ **PR Comment** - Comentário automático em PRs

### Features Removidas
- ❌ **CodeCov** - Upload de coverage para Codecov
- ❌ **Trivy Security Scan** - Scan de vulnerabilidades Docker
- ❌ **Multi-node tests** - Testes em múltiplas versões do Node
- ❌ **NPM Audit** - Auditoria de segurança de dependências

### Branches Removidas
- ❌ `main` (padrão antigo)
- ❌ `develop` (branch de desenvolvimento)
- ❌ `feature/*` (branches de feature)

---

## ✅ O Que Foi Mantido

### Essencial
- ✅ **ESLint** - Linting do código
- ✅ **Jest Tests** - Testes unitários e de integração
- ✅ **SonarCloud** - Análise de qualidade e segurança
- ✅ **TypeScript Build** - Compilação TS
- ✅ **Docker Build** - Containerização
- ✅ **Deploy** - Deploy automático na master

---

## 🔧 Configuração do SonarCloud

### No Workflow
```yaml
- name: SonarCloud Scan
  uses: SonarSource/sonarcloud-github-action@v3
  env:
    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

### Configuração Local
O arquivo `sonar-project.properties` contém:
- Paths de origem e teste
- Exclusões de arquivos
- Configuração de coverage
- Thresholds de duplicação

---

## 📊 Quality Gates

### SonarCloud (Obrigatório)
| Métrica | Threshold |
|---------|-----------|
| Bugs | 0 |
| Vulnerabilities | 0 |
| Security Rating | A |
| Coverage | > 80% |
| Duplication | < 3% |

### Pipeline (Obrigatório)
| Check | Threshold |
|-------|-----------|
| ESLint | 0 errors |
| Tests | 100% passing |
| Coverage | ≥ 80% |
| Build | Success |

---

## 🔐 Secrets Necessárias

### GitHub Secrets
```bash
# Configurar em: Settings → Secrets → Actions

SONAR_TOKEN=seu_token_sonarcloud
GITHUB_TOKEN=automático (já existe)
```

### Variáveis de Ambiente (Produção)
```bash
# Configurar no ambiente de deploy

JWT_SECRET=chave-secreta-forte
NODE_ENV=production
PORT=5000
```

---

## 🎯 Quando o Pipeline Roda

### ✅ Trigger Automático
- Push na branch `master`
- Pull Request para `master`

### ✅ Trigger Manual
- Workflow dispatch (botão "Run workflow")

### ❌ Não Roda
- Push em outras branches
- PRs para outras branches
- Commits em branches de feature

---

## 📝 Comandos Locais Equivalentes

### Pipeline Completo
```bash
# 1. Quality Analysis
npm run lint
npm run test:ci
npm run build

# 2. Tests
npm run test:ci

# 3. Build
npm run build

# 4. Docker (opcional)
docker build -t riddlezinho .
```

### Verificação Rápida
```bash
# Antes de commit
npm run lint && npm test && npm run build
```

---

## 🔍 Troubleshooting

### Pipeline Falha no SonarCloud
```bash
# Verificar token
echo $SONAR_TOKEN

# Rodar scan local
npx sonar-scanner \
  -Dsonar.token=$SONAR_TOKEN \
  -Dsonar.host.url=https://sonarcloud.io
```

### Pipeline Falha nos Testes
```bash
# Rodar testes local
npm run test:ci

# Verificar coverage
cat coverage/coverage-summary.json
```

### Pipeline Falha no Build
```bash
# Rodar build local
npm run build

# Verificar erros TypeScript
npx tsc --noEmit
```

### Pipeline Falha no Docker
```bash
# Build local
docker build -t riddlezinho .

# Testar container
docker run -p 5000:5000 riddlezinho
```

---

## 📈 Histórico de Mudanças

### 2026-02-22 - Simplificação
- **Removido:** 3 jobs desnecessários
- **Foco:** Apenas branch master
- **SonarCloud:** Migrado para ação oficial v3
- **Docker:** Build simplificado

### Versões Anteriores
- Workflow original com 7 jobs
- Múltiplas branches (main, develop, feature/*)
- CodeCov, Trivy, NPM Audit

---

## 🎯 Próximos Passos

1. **Commit:** Enviar workflow atualizado
2. **Test:** Rodar pipeline na master
3. **Verify:** Confirmar SonarCloud aprovado
4. **Monitor:** Acompanhar tempos de execução

---

**Última Atualização:** 2026-02-22  
**Status:** ✅ Pronto para deploy

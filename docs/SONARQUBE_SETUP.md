# 📋 Configuração do SonarQube e GitHub Actions

## 🎯 Visão Geral

Este documento descreve como configurar e usar o SonarQube e o pipeline de CI/CD do GitHub Actions para análise de qualidade de código.

---

## 🚀 Configuração Inicial

### 1. SonarQube Setup

#### 1.1 Criar Conta no SonarQube Cloud

1. Acesse [sonarcloud.io](https://sonarcloud.io/)
2. Faça login com sua conta do GitHub
3. Importe o repositório `lhgl/riddlezinho`

#### 1.2 Gerar Token do SonarQube

1. Vá para **My Account** → **Security**
2. Clique em **Generate Token**
3. Nome: `riddlezinho-pipeline`
4. Tipo: **User Token**
5. Copie o token gerado

#### 1.3 Adicionar Secret no GitHub

1. Vá para o repositório no GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret**
4. Nome: `SONAR_TOKEN`
5. Valor: (cole o token do SonarQube)
6. **Add secret**

#### 1.4 (Opcional) SonarQube Self-Hosted

Se usar uma instância própria do SonarQube:

1. Adicione outra secret: `SONAR_HOST_URL`
2. Valor: `https://seu-sonarqube.com`

---

## 📊 Quality Gates

### Configuração Padrão

O projeto está configurado com as seguintes métricas mínimas:

| Métrica | Mínimo | Crítico |
|---------|--------|---------|
| **Bugs** | 0 | 0 |
| **Vulnerabilities** | 0 | 0 |
| **Security Hotspots** | - | 0 |
| **Code Smells** | < 50 | < 100 |
| **Coverage** | > 80% | < 70% |
| **Duplication** | < 3% | < 5% |

### Personalizar Quality Gate

1. No SonarQube, vá para **Quality Gates**
2. Selecione o gate do projeto
3. Adicione/Edite condições conforme necessário

---

## 🔧 Pipeline do GitHub Actions

### Jobs Incluídos

| Job | Descrição | Timeout |
|-----|-----------|---------|
| 🔍 **Quality Analysis** | ESLint + SonarQube Scan | 15 min |
| 🧪 **Tests** | Unit + Integration tests | 20 min |
| 🏗️ **Build** | Docker build + Security scan | 20 min |
| 📚 **Documentation** | Check docs existence | 10 min |
| ⚡ **Performance** | Bundle size analysis | 10 min |
| 🚀 **Deploy** | Production deployment | 15 min |
| 📊 **Summary** | Pipeline summary | 5 min |

### Gatilhos

- **Push**: `main`, `develop`, `feature/*`
- **Pull Request**: `main`, `develop`
- **Manual**: `workflow_dispatch`

---

## 📈 Interpretando Resultados

### SonarQube Metrics

#### Bugs
- **A**: 0 bugs conhecidos
- **B-E**: 1+ bugs (quanto maior a letra, mais bugs)

#### Vulnerabilities
- **A**: 0 vulnerabilidades
- **B-E**: 1+ vulnerabilidades

#### Code Smells
- Tempo estimado para corrigir problemas de código
- Meta: < 1 dia

#### Coverage
- Porcentagem de código coberto por testes
- Meta: > 80%

#### Duplication
- Porcentagem de código duplicado
- Meta: < 3%

### GitHub Actions Status

| Ícone | Status | Significado |
|-------|--------|-------------|
| ✅ | Success | Job completou com sucesso |
| ❌ | Failure | Job falhou |
| ⚠️ | Warning | Job completou com avisos |
| 🔄 | Running | Job em execução |
| ⏭️ | Skipped | Job pulado |

---

## 🛠️ Comandos Locais

### Rodar Análise Completa

```bash
# Instalar dependências
npm install

# Rodar linter
npm run lint

# Rodar testes com coverage
npm run test:ci

# Rodar SonarQube scan (requer sonar-scanner)
npm run sonar
```

### Verificar Cobertura

```bash
# Ver relatório de cobertura
npm test -- --coverage

# Abrir relatório HTML (se disponível)
# coverage/lcov-report/index.html
```

### Security Audit

```bash
# Verificar vulnerabilidades
npm audit

# Corrigir automaticamente
npm audit fix

# Audit nível alto
npm audit --audit-level=high
```

---

## 🔍 Troubleshooting

### SonarQube Scan Falha

**Problema**: `ERROR: Token is invalid`

**Solução**:
1. Verifique se `SONAR_TOKEN` está correto
2. Regere o token no SonarQube
3. Atualize a secret no GitHub

**Problema**: `Coverage information is missing`

**Solução**:
1. Certifique-se de rodar testes antes do scan
2. Verifique se `coverage/lcov.info` existe
3. Confira o caminho em `sonar-project.properties`

### GitHub Actions Falha

**Problema**: `Job timeout`

**Solução**:
1. Aumente o `timeout-minutes` no workflow
2. Otimize testes lentos
3. Use cache de dependências

**Problema**: `npm install fails`

**Solução**:
```bash
# Limpe cache
npm cache clean --force

# Reinstale
rm -rf node_modules package-lock.json
npm install
```

---

## 📋 Checklist de Pull Request

Antes de criar um PR, verifique:

- [ ] Tests passing (`npm test`)
- [ ] Linter passing (`npm run lint`)
- [ ] Coverage > 80%
- [ ] No new bugs/vulnerabilities
- [ ] Documentation updated
- [ ] Commit messages following convention

---

## 🎯 Melhores Práticas

### Código

1. **Sempre** escreva testes para novo código
2. **Sempre** trate erros adequadamente
3. **Evite** código duplicado
4. **Use** TypeScript types explicitamente
5. **Mantenha** funções pequenas e focadas

### Commits

1. Use mensagens descritivas
2. Siga conventional commits
3. Commits atômicos (uma mudança por commit)
4. Referencie issues quando aplicável

### Pull Requests

1. PRs pequenos e focados
2. Descrição clara das mudanças
3. Link para issues relacionadas
4. Screenshots para mudanças visuais

---

## 📞 Suporte

### Links Úteis

- [SonarQube Docs](https://docs.sonarqube.org/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [TypeScript ESLint](https://typescript-eslint.io/)

### Contato

- **Issues**: [GitHub Issues](https://github.com/lhgl/riddlezinho/issues)
- **Discussions**: [GitHub Discussions](https://github.com/lhgl/riddlezinho/discussions)

---

## 📊 Histórico de Mudanças

### v2.5.0 (Atual)

- ✅ SonarQube integration
- ✅ GitHub Actions pipeline completo
- ✅ ESLint para TypeScript
- ✅ Security scanning com Trivy
- ✅ Coverage reporting com Codecov

### Próximas Melhorias

- [ ] Hotfix automation
- [ ] Auto-assign reviewers
- [ ] Release automation
- [ ] Performance budgets

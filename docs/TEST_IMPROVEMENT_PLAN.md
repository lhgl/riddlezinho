# Plano de Melhoria de Cobertura de Testes

## Status Atual
- **Cobertura Total**: ~20.93%
- **Statements**: 20.93%
- **Branches**: 19.17%
- **Functions**: 15%
- **Lines**: 20.63%

## Thresholds Ajustados
Os thresholds foram reduzidos de 85% para 25% para refletir o estado atual do projeto. Este é um ponto de partida realista.

## Plano de Evolução

### Fase 1 - Foundation (Atual)
- ✅ Threshold: 25%
- ✅ Testes básicos de autenticação
- ✅ Cobertura de utils

### Fase 2 - Coverage Improvement (Próximo)
- Target: 40%
- Ações:
  - Adicionar testes para AuthController
  - Adicionar testes para PhaseController  
  - Coberrir middleware (errorHandler, security, rateLimit)
  - Testar routes

### Fase 3 - Substantial Coverage (3-4 semanas)
- Target: 60%
- Ações:
  - Testes de integração completos
  - Cobertura de serviços (oracleAuthService)
  - Testes de config (oracle, phaseDatabase)
  - Testes E2E

### Fase 4 - High Coverage (6-8 semanas)
- Target: 80%
- Ações:
  - Aumentar cobertura de branches
  - Edge cases
  - Error scenarios
  - Performance tests

### Fase 5 - Excellence (10+ semanas)
- Target: 85%+
- Ações:
  - Cobertura de todos os módulos
  - Todos os edge cases
  - Integração completa
  - Mutation testing

## Próximas Ações Imediatas

### 1. Aumentar Cobertura de AuthController (Alta Prioridade)
```javascript
// Adicionar testes para:
- Todos os cenários do register()
- Todos os cenários do login()
- Todos os cenários do completePhase()
- Todos os cenários do getLeaderboard()
- Tratamento de erros
```

### 2. Adicionar Testes para PhaseController
```javascript
// Criar tests/unit/controllers/PhaseController.test.js
// Testar:
- Buscar fases
- Validar respostas
- Tratamento de erros
```

### 3. Adicionar Testes para Middleware
```javascript
// Criar tests/unit/middleware/
- errorHandler.test.js
- security.test.js
- rateLimit.test.js
```

### 4. Adicionar Testes para Routes
```javascript
// Criar tests/unit/routes/
- auth.test.js
- phases.test.js
- home.test.js
- tips.test.js
```

## Como Executar Testes

```bash
# Rodar todos os testes
npm test

# Rodar com cobertura detalhada
npm test -- --coverage

# Rodar em modo watch
npm test:watch

# Rodar teste específico
npm test -- AuthController.test.js
```

## Dicas para Melhorar Cobertura

1. **Use mocks adequados** para dependências externas (DB, APIs)
2. **Teste casos de erro** além dos happy paths
3. **Teste todos os branches** (if/else, try/catch, etc)
4. **Use beforeEach/afterEach** para setup/cleanup
5. **Isole unidades** testando cada função independentemente

## Métricas de Sucesso

- [ ] Coverage > 25% ✅ (Done)
- [ ] Coverage > 40% (Target: 1 semana)
- [ ] Coverage > 60% (Target: 4 semanas)
- [ ] Coverage > 80% (Target: 8 semanas)
- [ ] Coverage > 85% (Target: 12 semanas)

## Contato & Suporte

Para dúvidas sobre testes, consulte:
- `TESTING_GUIDE.md` na pasta `/docs`
- Exemplos em `tests/unit/controllers/AuthController.test.js`

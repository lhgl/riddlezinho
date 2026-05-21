# 🤝 Contributing - RiddleZinho v3.2.0

## Como Contribuir

Obrigado por seu interesse em contribuir com o RiddleZinho!

### Tipos de Contribuição

- 🐛 Reportar bugs
- 💡 Sugerir funcionalidades
- 📝 Melhorar documentação
- 🔧 Enviar pull requests
- 🧪 Escrever testes

---

## Setup de Desenvolvimento

### 1. Fork e Clone

```bash
# Fork no GitHub
# Clone seu fork
git clone https://github.com/SEU_USUARIO/riddlezinho.git
cd riddlezinho
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Git Hooks

```bash
# Opcional: configurar pre-commit hooks
```

### 4. Desenvolver

```bash
# Compilar TypeScript em watch mode
npm run build -- --watch

# Rodar testes
npm test

# Iniciar servidor (dev)
npm run dev
```

---

## Padrões de Código

### TypeScript

- Use tipos explícitos quando possível
- Evite `any` - use tipos específicos
- Siga o `tsconfig.json` (strict mode)

### Estilo

- Use Prettier (configuração incluída)
- Siga ESLint rules
- Use aspas simples em strings

### Commits

Siga [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona leaderboard por nível
fix: corrige erro de autenticação
docs: atualiza README
test: adiciona testes para AuthController
refactor: refatora middleware de segurança
```

---

## Pull Requests

### Antes de Enviar

1. ✅ Testes passando
2. ✅ Coverage mantido (80%+)
3. ✅ TypeScript compilando
4. ✅ Lint sem erros

### Checklist de PR

```markdown
## Descrição
<!-- Descreva suas mudanças -->

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Testes
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Testes manuais

## Checklist
- [ ] Meu código segue os padrões do projeto
- [ ] Adicionei/atualizei testes
- [ ] Atualizei a documentação
- [ ] TypeScript compila sem erros
- [ ] Todos os testes passam
```

---

## Reportar Bugs

### Template de Bug Report

```markdown
**Descrição**
<!-- Descreva o bug -->

**Para Reproduzir**
1. Passo 1
2. Passo 2
3. Passo 3

**Comportamento Esperado**
<!-- O que deveria acontecer -->

**Screenshots**
<!-- Se aplicável -->

**Ambiente:**
- OS: [ex: Windows 10]
- Node: [ex: 20.x]
- Versão: [ex: 3.2.0]

**Logs**
<!-- Se aplicável -->
```

---

## Sugerir Funcionalidades

### Template de Feature Request

```markdown
**Problema**
<!-- Descreva o problema que sua feature resolve -->

**Solução**
<!-- Descreva a solução proposta -->

**Alternativas**
<!-- Outras soluções consideradas -->

**Contexto Adicional**
<!-- Mais informações -->
```

---

## Estrutura de Pastas

```
riddlezinho/
├── src/                    # Código TypeScript
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   └── utils/
├── tests/                  # Testes
│   ├── unit/
│   └── integration/
├── views/                  # Templates EJS
├── docs/                   # Documentação
└── public/                 # Arquivos estáticos
```

---

## Testes

### Rodar Testes

```bash
# Todos os testes
npm test

# Com coverage
npm test -- --coverage

# Watch mode
npm run test:watch

# Testes específicos
npm test -- --testNamePattern="auth"
```

### Escrever Testes

```typescript
// tests/unit/example.test.ts
describe('Example', () => {
  it('deve fazer algo', () => {
    expect(true).toBe(true);
  });
});
```

---

## Documentação

### Atualizar README

- Mantenha exemplos atualizados
- Teste todos os comandos
- Use Markdown consistente

### Docs/

- `ARCHITECTURE.md` - Arquitetura
- `API.md` - API Reference
- `QUICK_START.md` - Início rápido
- `USER_GUIDE.md` - Guia do usuário

---

## Code Review

### Critérios

- ✅ Código limpo e legível
- ✅ Tipos TypeScript corretos
- ✅ Testes adicionados/atualizados
- ✅ Documentação atualizada
- ✅ Sem breaking changes não documentadas

### Processo

1. Submit PR
2. Aguardar review
3. Resolver comentários
4. Aprovação
5. Merge

---

## Comunicação

### Issues

- Use labels apropriadas
- Seja claro e objetivo
- Inclua exemplos quando possível

### Discussões

- GitHub Discussions para ideias
- Issues para bugs e features
- PRs para código

---

## Reconhecimento

Contribuidores serão listados em:

- README.md
- CHANGELOG.md
- GitHub Contributors

---

## Licença

Ao contribuir, você concorda que sua contribuição será licenciada sob a licença MIT do projeto.

---

**Versão**: 3.2.0 | **TypeScript** | **Obrigado por contribuir!**

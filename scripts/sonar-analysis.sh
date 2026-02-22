#!/bin/bash

# Script para rodar análise SonarCloud localmente
# Uso: ./sonar-analysis.sh

# Verificar se SONAR_TOKEN está definido
if [ -z "$SONAR_TOKEN" ]; then
    echo "Erro: SONAR_TOKEN não está definido"
    echo "Exporte seu token: export SONAR_TOKEN=seu-token-aqui"
    exit 1
fi

# Limpar análise anterior
rm -rf .scannerwork

# Rodar testes e gerar coverage
echo "Rodando testes e gerando coverage..."
npm run test:ci

# Rodar SonarScanner
echo "Rodando SonarScanner..."
npx sonar-scanner \
  -Dsonar.projectKey=lhgl_riddlezinho \
  -Dsonar.sources=src,public \
  -Dsonar.tests=tests \
  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
  -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info \
  -Dsonar.host.url=https://sonarcloud.io \
  -Dsonar.login=$SONAR_TOKEN \
  -Dsonar.branch.name=$(git rev-parse --abbrev-ref HEAD)

echo "Análise concluída! Verifique: https://sonarcloud.io/summary/new_code?id=lhgl_riddlezinho"

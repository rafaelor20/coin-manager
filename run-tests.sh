#!/bin/bash

echo "=== Parando containers da aplicação principal para evitar conflito de portas ==="
docker compose down

echo "=== Executando testes automatizados ==="
docker compose -f docker-compose-test.yml up --build --exit-code-from node-test
TEST_EXIT_CODE=$?

echo "=== Limpando containers e volumes de teste ==="
docker compose -f docker-compose-test.yml down -v

if [ $TEST_EXIT_CODE -eq 0 ]; then
  echo "=== Testes finalizados com sucesso! ==="
else
  echo "=== Testes falharam (código: $TEST_EXIT_CODE) ==="
fi

exit $TEST_EXIT_CODE

#!/bin/bash
set -e

echo "=== Parando containers atuais ==="
docker compose down -v --rmi all --remove-orphans

echo "=== Resetando banco de dados e executando seeds ==="
docker compose -f docker-compose.dbreset.yml build
docker compose -f docker-compose.dbreset.yml up --exit-code-from db-reset

echo "=== Seed finalizado. Derrubando containers de reset ==="
docker compose -f docker-compose.dbreset.yml down

echo "=== Subindo aplicação ==="
docker compose up -d --build

echo "=== Aplicação iniciada com sucesso! Acesse http://localhost:8080 ==="

# coin-manager

coin manager is personal finance management app that provides a simple
way to streamline your finances, tracking your income, expenses and debts

## User for manual testing the app

```bash
email: user@test.com
```

```bash
password: qwerasdf
```

## Environment Setup

Before starting the project, make sure the environment variables are properly configured. The repository provides `.env.example` templates as well as pre-configured environment files for Docker Compose, local development, and testing.

### 1. Back-end Configuration

To customize or set your local environment variables, copy the example file in the `back-end` directory:

```bash
cp back-end/.env.example back-end/.env
```

Environment files available in `back-end/`:
- `.env.compose`: Default configuration used by Docker Compose (`docker-compose.yml`).
- `.env.local`: Default configuration for running the back-end locally outside Docker.
- `.env.test`: Configuration for automated test runs (`run-tests.sh` / `docker-compose-test.yml`).
- `.env.example`: Reference template with all available variables (`PORT`, `DATABASE_URL`, `JWT_SECRET`, `MAIL_*`, `FRONTEND_URL`).

### 2. Front-end Configuration

To customize or set your front-end environment variables, copy the example file in the `front-end` directory:

```bash
cp front-end/.env.example front-end/.env
```

Environment files available in `front-end/`:
- `.env.compose`: Pre-configured for Docker Compose (`REACT_APP_API_BASE_URL=http://localhost:8080/api`).
- `.env.local`: Pre-configured for local development (`REACT_APP_API_BASE_URL=http://localhost:5000`).
- `.env.example`: Reference template for front-end variables (`REACT_APP_API_BASE_URL`).

## Starting the project for the first time or resetting database

To initialize or reset the database with migrations and automatic seed, and start the application containers:

```bash
./reset-containers.sh
```

## Running the project with docker compose

```bash
docker compose up -d --build
```

## Running automated tests

To run the automated tests in isolated test containers:

```bash
./run-tests.sh
```

## After executing the command, access http://localhost:8080/ on your browser


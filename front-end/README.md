# coin-manager-frontend

Back-end for coin manager, a personal finance app.

## About

coin manager is personal finance management app that provides a simple
way to streamline your finances, tracking your income and expenses

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Populate `.env` file based on `.env.example`. `REACT_APP_API_BASE_URL` should point to your API server (driven.t-back)

4. Run the back-end in a development environment:

```bash
npm run start
```

## Building and starting for production

```bash
npm run build
npm start
```

## Running application locally or inside docker

The `.env` files are organized by environment:
- `.env.compose`: For running the complete stack with Docker Compose.
- `.env.local`: For running frontend locally with `npm start`.
- `.env.test`: For automated test environments.
- `.env`: Base/common environment file that has top priority.

## What to do when add new ENV VARIABLES

Please notice that every ENV that should be available on browser should start with `REACT_APP_` prefix. There are several things you need to do when you add new ENV VARIABLES:

- Add them to `.env.example` file
- Add them to your local `.env` file
- Add them to your docker-compose.yml file (just the name, not the value). Only envs listed in the environment section will be exposed to your docker container.
- Add them (prod version) to your github repo secrets. They will be used to generate the `.env` file on deploy.

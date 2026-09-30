# Stage 1: Build & test stage (includes all dev dependencies and build tools)
FROM node:20-alpine AS builder

# Install OpenSSL, libc6-compat and build tools for native packages (bcrypt)
RUN apk add --no-cache openssl libc6-compat python3 make g++

WORKDIR /usr/src

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate && npm run build

# Stage 2: Production dependencies
FROM node:20-alpine AS prod-deps

RUN apk add --no-cache openssl libc6-compat python3 make g++

WORKDIR /usr/src

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --omit=dev

# Stage 3: Production runtime
FROM node:20-alpine AS runner

# Install only runtime libraries (OpenSSL for Prisma engine, libc6-compat for musl)
RUN apk add --no-cache openssl libc6-compat

WORKDIR /usr/src

ENV NODE_ENV=production

COPY --from=prod-deps /usr/src/package*.json ./
COPY --from=prod-deps /usr/src/node_modules ./node_modules
COPY --from=builder /usr/src/dist ./dist
COPY --from=builder /usr/src/prisma ./prisma
COPY --from=builder /usr/src/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/node_modules/@prisma/client ./node_modules/@prisma/client

EXPOSE 5000

CMD ["npm", "run", "start"]

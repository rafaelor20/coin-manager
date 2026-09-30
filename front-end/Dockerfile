# Stage 1: Build the React application
FROM node:16-alpine AS builder

WORKDIR /app

# Install project dependencies
COPY package*.json ./
RUN npm install

# Copy source files and create production build
COPY . .
RUN npm run build

# Stage 2: Minimal production image containing only the built static assets
FROM alpine:3.19

WORKDIR /var/www/html

# Copy build artifacts from builder stage
COPY --from=builder /app/build /var/www/html

CMD ["tail", "-f", "/dev/null"]

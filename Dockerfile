# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy only package files first
COPY package*.json ./
RUN npm install

# Copy the rest of the files
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:18-alpine AS runner
WORKDIR /app

# Copy build files and node_modules from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npx", "next", "start", "-H", "0.0.0.0", "-p", "3000"]

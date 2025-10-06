# Stage 1 — build
FROM node:18-alpine AS builder
WORKDIR /app

# copy package files first for layer caching
COPY package*.json ./
RUN npm install --production=false

# copy sources and build
COPY . .
RUN npm run build

# Stage 2 — runtime
FROM node:18-alpine AS runner
WORKDIR /app

# copy only production deps
COPY package*.json ./
RUN npm install --production=true

# copy built files and public
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public

# copy next.config if exists
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "start"]

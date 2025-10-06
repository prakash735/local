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

# Copy build files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# No need to run `npm install --omit=dev` again
# If needed, you can prune devDependencies manually, but usually not required for Next.js

EXPOSE 3000

CMD ["npx", "next", "start"]

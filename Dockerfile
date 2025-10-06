# Step 1: Build the Next.js app
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install dev dependencies for build
COPY package*.json ./
RUN npm install

# Copy all code
COPY . .

# Build Next.js app
RUN npm run build

# Step 2: Prepare production image
FROM node:18-alpine AS runner
WORKDIR /app

# Copy only build output and necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.js ./next.config.js

# Install only production dependencies
RUN npm install --omit=dev

# Expose port
EXPOSE 3000

# Start the app
CMD ["npx", "next", "start"]

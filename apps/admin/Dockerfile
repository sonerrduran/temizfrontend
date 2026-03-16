FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
COPY apps/admin/package.json ./apps/admin/
COPY packages/ui/package.json ./packages/ui/
COPY packages/shared/package.json ./packages/shared/
COPY packages/mock-data/package.json ./packages/mock-data/

# Install dependencies
RUN npm ci

# Build stage
FROM base AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/admin/node_modules ./apps/admin/node_modules

# Copy source code
COPY . .

# Build packages first
RUN npm run build:packages

# Build the admin app
WORKDIR /app/apps/admin
RUN npm run build

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built application
COPY --from=builder /app/apps/admin/dist ./dist
COPY --from=builder /app/apps/admin/package.json ./

# Install production dependencies only
RUN npm ci --only=production

EXPOSE 5010

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5010"]

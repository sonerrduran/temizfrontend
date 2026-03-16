FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
COPY micro-frontends/logic-games/package.json ./micro-frontends/logic-games/
COPY packages/game-engine/package.json ./packages/game-engine/
COPY packages/ui/package.json ./packages/ui/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies
RUN npm ci

# Build stage
FROM base AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/micro-frontends/logic-games/node_modules ./micro-frontends/logic-games/node_modules

# Copy source code
COPY . .

# Build packages first
RUN npm run build:packages

# Build the logic-games micro frontend
WORKDIR /app/micro-frontends/logic-games
RUN npm run build

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built application
COPY --from=builder /app/micro-frontends/logic-games/dist ./dist
COPY --from=builder /app/micro-frontends/logic-games/package.json ./

# Install production dependencies only
RUN npm ci --only=production

EXPOSE 5002

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5002"]

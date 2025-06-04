# Use Node.js LTS version as base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Development stage
FROM base AS development
# Install all dependencies (including devDependencies)
RUN pnpm install
# Copy source code
COPY . .
# Expose port
EXPOSE 3004
# Start in development mode
CMD ["pnpm", "run", "dev"]

# Build stage
FROM base AS build
# Install all dependencies (including devDependencies for build)
RUN pnpm install
# Copy source code
COPY . .
# Build the application
RUN pnpm run build

# Production stage
FROM node:18-alpine AS production
# Set NODE_ENV to production
ENV NODE_ENV=production
# Set working directory
WORKDIR /app
# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./
# Install pnpm globally
RUN npm install -g pnpm
# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile
# Copy built application from build stage
COPY --from=build /app/dist ./dist
# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app
USER nodejs
# Expose port
EXPOSE 3004
# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node --version || exit 1
# Start the application
CMD ["node", "dist/server.js"]

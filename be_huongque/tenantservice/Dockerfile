# Stage 1: Build the NestJS app
FROM node:22-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev) for building
RUN npm ci --include=dev

# Copy source files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Create a minimal runtime image
FROM node:22-slim AS production

WORKDIR /app

# Install curl for health checks
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Create non-root user for security
RUN groupadd -r nestapp && useradd -r -g nestapp nestapp
RUN chown -R nestapp:nestapp /app
USER nestapp

EXPOSE 8084

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8084/health || exit 1

# Set production environment
ENV NODE_ENV=production

# Use node directly instead of npm for better signal handling
CMD ["node", "dist/main.js"]

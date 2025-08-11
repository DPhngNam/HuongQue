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

# Use node directly instead of npm for better signal handling
CMD ["node", "dist/main.js"]

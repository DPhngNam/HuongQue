# Stage 1: Build the NestJS app
FROM node:22-slim AS builder

WORKDIR /app

# Install only production dependencies initially
COPY package*.json ./
# 👇 Install nest CLI globally
RUN npm install -g @nestjs/cli && npm install

# Copy source files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Create a minimal runtime image
FROM node:22-slim

WORKDIR /app

# Only copy what's necessary
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose your app's port
EXPOSE 8086

# Run the app
CMD ["node", "dist/main"]
# # Stage 1: Build the NestJS app
# FROM node:22-slim AS builder

# WORKDIR /app

# # Install only production dependencies initially
# COPY package*.json ./
# # 👇 Install nest CLI globally
# RUN npm install -g @nestjs/cli && npm install

# # Copy source files
# COPY . .

# # Build the app
# RUN npm run build

# # Stage 2: Create a minimal runtime image
# FROM node:22-slim

# WORKDIR /app

# # Only copy what's necessary
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package*.json ./

# # Expose your app's port
# EXPOSE 8086

# # Run the app
# CMD ["node", "dist/main.js"]

FROM node:22-slim

# Install system dependencies (optional but helpful for watch mode)
RUN apt-get update && apt-get install -y \
    inotify-tools \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install Nest CLI globally
RUN npm install -g @nestjs/cli

# Copy only package files for dependency installation
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy source files (you'll override this with a volume during development)
COPY . .

# Expose app port
EXPOSE 8086

# Start the app in watch mode for development
CMD ["npm", "run", "start:dev"]

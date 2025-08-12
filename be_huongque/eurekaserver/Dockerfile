# Stage 1: Build the application
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy Maven wrapper, .mvn directory, and pom.xml
COPY mvnw pom.xml ./
COPY .mvn/ .mvn/
COPY src ./src

# Ensure mvnw is executable and has correct line endings
RUN chmod +x mvnw && sed -i 's/\r$//' mvnw

# Build the application
RUN mvn clean install -DskipTests -B

# Stage 2: Create runtime image
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user for security
RUN addgroup -S springapp && adduser -S -G springapp springapp

# Copy the built JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Change ownership to non-root user
RUN chown -R springapp:springapp /app
USER springapp

# Expose port
EXPOSE 8761

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8761/actuator/health || exit 1

# Set production profile and JVM options
ENV SPRING_PROFILES_ACTIVE=prod
ENV JAVA_OPTS="-Xmx512m -Xms256m -XX:+UseG1GC -XX:+UseContainerSupport"

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
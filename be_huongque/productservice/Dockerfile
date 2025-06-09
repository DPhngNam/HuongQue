# # Build stage
# FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
# WORKDIR /app
# COPY pom.xml .
# COPY src ./src
# RUN mvn clean package -DskipTests

# # Run stage
# FROM eclipse-temurin:21-jre-alpine
# WORKDIR /app
# COPY --from=build /app/target/productservice-0.0.1-SNAPSHOT.jar app.jar
# EXPOSE 8085
# ENTRYPOINT ["sh", "-c", "sleep 30 && java -jar app.jar"]

# productservice/Dockerfile (for development with hot reload)

# Build stage (optional, but good for caching dependencies)
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline # Download dependencies to speed up subsequent builds

# Development stage
FROM maven:3.9.9-eclipse-temurin-21-alpine
WORKDIR /app
COPY --from=build /root/.m2 /root/.m2 
COPY pom.xml .
COPY src ./src

# Expose port for the application and LiveReload (if used)
EXPOSE 8085
EXPOSE 35729 
# Configure DevTools and run the application
# -Dspring.devtools.restart.enabled=true: Ensures DevTools is enabled
# -Dspring.devtools.livereload.enabled=true: Enables LiveReload for static resources
# -Dspring-boot.run.jvmArguments: For passing JVM args to the Spring Boot application
ENTRYPOINT ["mvn", "spring-boot:run", \
            "-Dspring-boot.run.jvmArguments=\"-Dspring.devtools.restart.enabled=true -Dspring.devtools.livereload.enabled=true\""]


# Use OpenJDK 17 as the base image
FROM openjdk:21-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy Maven Wrapper and pom.xml for dependency resolution
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Download dependencies to cache them
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copy the source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose the application port
EXPOSE 8765

# Run the Spring Boot application
CMD ["java", "-jar", "target/apigateway-0.0.1-SNAPSHOT.jar"]
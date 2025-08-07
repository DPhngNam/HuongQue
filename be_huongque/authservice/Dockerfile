FROM maven:3.9.9-eclipse-temurin-21-alpine AS dev

WORKDIR /app

# Copy only pom.xml first to cache dependencies
COPY pom.xml .

# Pre-download dependencies
RUN mvn dependency:go-offline

# Copy the rest of the source code
COPY src ./src

# Enable Spring Boot DevTools
CMD ["mvn", "spring-boot:run", "-Dspring-boot.run.profiles=dev"]
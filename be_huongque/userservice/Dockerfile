# # Build stage
# FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
# WORKDIR /app
# COPY pom.xml .
# COPY src ./src
# RUN mvn clean package -DskipTests

# # Run stage
# FROM eclipse-temurin:21-alpine
# WORKDIR /app
# COPY --from=build /app/target/userservice-0.0.1-SNAPSHOT.jar app.jar
# EXPOSE 8083
# ENTRYPOINT ["sh", "-c", "sleep 30 && java -jar app.jar"]

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

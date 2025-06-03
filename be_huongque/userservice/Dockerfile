# Build stage
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-alpine
WORKDIR /app
COPY --from=build /app/target/userservice-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8083
ENTRYPOINT ["sh", "-c", "sleep 30 && java -jar app.jar"]
# Build stage
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-alpine
WORKDIR /app
COPY --from=build /app/target/adminservice-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8090

# Run the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
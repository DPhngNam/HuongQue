# Build stage
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests -X
RUN echo "Contents of target directory:"
RUN ls -la target/
RUN echo "Contents of current directory:"
RUN ls -la

# Run stage
FROM eclipse-temurin:21-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
RUN echo "Contents of /app directory:"
RUN ls -la
EXPOSE 8085
ENTRYPOINT ["java", "-jar", "app.jar"]

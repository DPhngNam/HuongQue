# Build stage
# FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
# WORKDIR /app
# COPY pom.xml .
# COPY src ./src
# RUN mvn clean package -DskipTests

# # Run stage
# FROM eclipse-temurin:21-alpine
# WORKDIR /app
# COPY --from=build /app/target/searchservice-0.0.1-SNAPSHOT.jar app.jar
# EXPOSE 8091
# ENTRYPOINT ["sh", "-c", "sleep 30 && java -jar app.jar"]


FROM maven:3.9.9-eclipse-temurin-21-alpine
WORKDIR /app

# Copy toàn bộ mã nguồn
COPY . .

# Download dependencies trước (cache)
RUN ./mvnw dependency:go-offline



CMD ["./mvnw", "spring-boot:run", "-Dspring-boot.run.jvmArguments=--add-opens java.base/java.util=ALL-UNNAMED"]

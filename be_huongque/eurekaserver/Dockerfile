# # Build stage
# FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
# WORKDIR /app
# COPY pom.xml .
# COPY src ./src
# RUN mvn clean package -DskipTests

# # Run stage
# FROM eclipse-temurin:21-jre-alpine
# WORKDIR /app
# # Copy the built JAR from the build stage
# COPY --from=build /app/target/eurekaserver-0.0.1-SNAPSHOT.jar app.jar

# # Expose the port the application runs on
# EXPOSE 8761

# # Command to run the application
# ENTRYPOINT ["java", "-jar", "app.jar"]

FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Cài các tiện ích (nếu cần wget, curl, etc.)
RUN apk add --no-cache bash curl

# Copy toàn bộ code (bao gồm cả .mvn và mvnw)
COPY . .

# Cấp quyền cho mvnw
RUN chmod +x mvnw

# Chạy ứng dụng ở chế độ dev
CMD ["./mvnw", "spring-boot:run"]

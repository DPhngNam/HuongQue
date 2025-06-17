# # Use an official OpenJDK runtime as a parent image for building
# FROM openjdk:21-jdk-slim AS build

# # Set the working directory inside the container
# WORKDIR /

# # Copy the Maven build files
# COPY pom.xml ./ 

# # Copy the source code
# COPY src ./src

# # Install Maven
# RUN apt-get update && apt-get install -y maven && apt-get clean

# # Build the application (creates target/app.jar)
# RUN mvn clean package

# # Use a slim runtime image for running the app
# FROM openjdk:21-jdk-slim

# # Set the working directory
# WORKDIR /

# # Copy the built JAR from the build stage
# COPY --from=build /target/s3bucket-0.0.1-SNAPSHOT.jar /s3bucket-0.0.1-SNAPSHOT.jar

# # Expose the port the application runs on
# EXPOSE 8087

# ENTRYPOINT ["sh", "-c", "sleep 30 && java -jar s3bucket-0.0.1-SNAPSHOT.jar"]
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

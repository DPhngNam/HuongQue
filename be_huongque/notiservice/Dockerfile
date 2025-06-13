FROM maven:3.9.9-eclipse-temurin-21-alpine
WORKDIR /app

# Copy cấu trúc project cần thiết
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

# Download dependencies trước (cache)
RUN ./mvnw dependency:go-offline

# Copy toàn bộ mã nguồn
COPY . .

# Cấu hình để chạy với DevTools
CMD ["./mvnw", "spring-boot:run"]
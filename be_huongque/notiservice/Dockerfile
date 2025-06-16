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

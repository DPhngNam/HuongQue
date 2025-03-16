# Sử dụng OpenJDK 17 (hoặc phiên bản phù hợp)
FROM openjdk:17-jdk-slim

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy file `pom.xml` và thư mục `src/`
COPY pom.xml .
COPY src ./src

# Copy file Maven Wrapper (nếu có)
COPY mvnw .
COPY .mvn .mvn

# Cấp quyền thực thi cho Maven Wrapper
RUN chmod +x mvnw

# Build ứng dụng
RUN ./mvnw clean package -DskipTests

# Chạy ứng dụng Spring Boot
CMD ["java", "-jar", "target/authservice-0.0.1-SNAPSHOT.jar"]

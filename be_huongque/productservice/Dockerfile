FROM openjdk:21-jdk-slim
WORKDIR /app

# Copy mã nguồn để hot reload
COPY . /app

# Cấp quyền Maven wrapper
RUN chmod +x ./mvnw

# Expose port
EXPOSE 8085

# Lệnh chạy app, đảm bảo foreground process
CMD ["./mvnw", "spring-boot:run", "-Dspring.devtools.restart.enabled=true"]

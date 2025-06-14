FROM openjdk:21-jdk-slim
WORKDIR /app
COPY . /app
RUN chmod +x ./mvnw
EXPOSE 8085
CMD ["./mvnw", "spring-boot:run", "-Dspring.devtools.restart.enabled=true"]

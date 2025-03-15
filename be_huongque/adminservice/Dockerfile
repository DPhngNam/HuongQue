# Use a lightweight JDK runtime
FROM eclipse-temurin:17-jdk-alpine

# Set working directory inside the container
WORKDIR /app

# Copy the built application JAR file into the container
COPY target/adminservice.jar adminservice.jar

# Expose the port your Spring Boot application runs on
EXPOSE 8080



# Run the application
ENTRYPOINT ["java", "-jar", "adminservice.jar"]
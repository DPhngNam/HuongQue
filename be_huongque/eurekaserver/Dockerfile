
FROM openjdk:21-jdk-slim AS build

# Set the working directory inside the container
WORKDIR /

# Copy the Maven build files
COPY pom.xml ./ 

# Copy the source code
COPY src ./src

# Install Maven
RUN apt-get update && apt-get install -y maven && apt-get clean

# Build the application (creates target/app.jar)
RUN mvn clean package

# Use a slim runtime image for running the app
FROM openjdk:21-jdk-slim

# Set the working directory
WORKDIR /

# Copy the built JAR from the build stage
COPY --from=build /target/eurekaserver-0.0.1-SNAPSHOT.jar /eurekaserver-0.0.1-SNAPSHOT.jar

# Expose the port the application runs on
EXPOSE 8761

# Command to run the application
ENTRYPOINT ["java", "-jar", "eurekaserver-0.0.1-SNAPSHOT.jar"]
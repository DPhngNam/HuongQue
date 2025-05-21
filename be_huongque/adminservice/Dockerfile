# Use an official OpenJDK runtime as a parent image for building
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
COPY --from=build /target/adminservice-0.0.1-SNAPSHOT.jar adminservice-0.0.1-SNAPSHOT.jar

# Run the JAR file
ENTRYPOINT ["java", "-jar", "adminservice-0.0.1-SNAPSHOT.jar"]
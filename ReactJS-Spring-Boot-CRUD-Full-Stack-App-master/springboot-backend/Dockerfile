# Use Java 17
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Give permission to mvnw
RUN chmod +x mvnw

# Build the project
RUN ./mvnw clean package -DskipTests

# Run the jar (IMPORTANT: exact jar name)
CMD ["java", "-jar", "target/springboot-backend-0.0.1-SNAPSHOT.jar"]

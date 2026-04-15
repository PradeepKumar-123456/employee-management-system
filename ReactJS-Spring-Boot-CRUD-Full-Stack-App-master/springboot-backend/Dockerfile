FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw

# Build jar
RUN ./mvnw clean package -DskipTests

# Rename jar to app.jar (IMPORTANT STEP)
RUN mv target/*.jar app.jar

# Run jar
CMD ["java", "-jar", "app.jar"]

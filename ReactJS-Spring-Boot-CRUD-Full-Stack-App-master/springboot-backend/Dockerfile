FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /workspace

COPY springboot-backend/ .
RUN chmod +x mvnw
RUN ./mvnw -B -DskipTests clean package

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /workspace/target/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

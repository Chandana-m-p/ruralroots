# Step 1: Build stage
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests -B

# Step 2: Runtime stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
ENV PORT=8085
EXPOSE 8085
COPY --from=build /app/target/ruralroots-backend-*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

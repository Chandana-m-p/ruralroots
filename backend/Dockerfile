FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN if [ -f "pom.xml" ]; then mvn clean package -DskipTests; else cd backend && mvn clean package -DskipTests && cp target/*.jar /app/target/; fi

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/ruralroots-backend-*.jar app.jar

ENV PORT=8085
EXPOSE 8085

ENTRYPOINT ["java", "-jar", "app.jar"]

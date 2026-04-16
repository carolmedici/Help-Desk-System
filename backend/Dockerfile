FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY . .

RUN mvn clean package -DskipTests -Dfile.encoding=UTF-8

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-Xmx384m", "-Xss512k", "-jar", "app.jar"]
FROM openjdk:17-jdk-slim as build

COPY target/user-service.jar user-service.jar

ENTRYPOINT ["java","-jar","user-service.jar"]

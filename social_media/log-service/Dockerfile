FROM openjdk:17-jdk-slim as build
EXPOSE 8082
ADD target/log-service.jar log-service.jar
ENTRYPOINT ["java","-jar","log-service.jar"]
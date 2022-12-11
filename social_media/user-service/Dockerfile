FROM openjdk:17-jdk-slim as build
EXPOSE 8083
ADD target/user-service.jar user-service.jar
ENTRYPOINT ["java","-jar","user-service.jar"]
FROM openjdk:17-jdk-slim as build
EXPOSE 8081
ADD target/chat-service.jar chat-service.jar
ENTRYPOINT ["java","-jar","chat-service.jar"]
FROM openjdk:19

ENV ENVIRONMENT=prod

EXPOSE 8080

ADD backend/target/flashacom.jar flashacom.jar

CMD ["sh", "-c", "java -jar /flashacom.jar"]
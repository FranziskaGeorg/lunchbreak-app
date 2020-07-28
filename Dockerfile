FROM openjdk:14

ENV ENVIRONMENT=prod

MAINTAINER Franziska Georg <franzi.georg@web.de>

ADD lunchbreak-backend/target/lunchbreak-app.jar app.jar

CMD ["sh", "-c", "java -Dserver.port=$PORT -Dspring.data.mongodb.uri=$MONGODB_URI -Dauth.jwt.secret=$JWT_SECRET -Dcloudinary.url=$CLOUDINARY_URL -jar /app.jar"]
FROM openjdk:8-jdk-alpine

# Bootstrap build environment
RUN mkdir /build
WORKDIR /build
COPY . /build

RUN apk add nodejs npm

# Build app
RUN npm install
RUN npm rebuild node-sass
RUN ./gradlew build

# Copy artifacts
RUN mkdir -p /app
RUN cp -r build/libs/*.jar /app
WORKDIR /app
RUN JAR=`ls` && ln -s $JAR app.jar

# Remove build environment
RUN rm -rf /build

# Run
VOLUME /tmp
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
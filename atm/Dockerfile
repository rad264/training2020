FROM maven:3.6-jdk-11 as maven_build
LABEL maintainer="James Wong <tw2686@columbia.com>"

COPY . .

RUN mvn clean package  -Dmaven.test.skip

FROM tomcat:8.5.57-jdk11-corretto
COPY --from=maven_build /atm-api/target/*.war /usr/local/tomcat/webapps/atm-api.war
COPY --from=maven_build /atm-ui/target/*.war /usr/local/tomcat/webapps/atm-ui.war

# FROM tomcat:8.5.57-jdk11-corretto
# COPY atm-api/target/*.war /usr/local/tomcat/webapps/atm-api.war
# COPY atm-ui/target/*.war /usr/local/tomcat/webapps/atm-ui.war
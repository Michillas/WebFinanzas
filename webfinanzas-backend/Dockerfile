# Etapa 1: Construcción de la aplicación (Build)
FROM maven:3.9.1-eclipse-temurin-21 AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo pom.xml y descargar las dependencias (Maven)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiar el código fuente
COPY src ./src

# Construir el paquete JAR con Maven
RUN mvn clean package -DskipTests

# Etapa 2: Producción (Run)
FROM eclipse-temurin:21-jre-jammy

# Copiar el archivo JAR desde la etapa de construcción
COPY --from=builder /app/target/my-app.jar /usr/app/my-app.jar

# Establecer el directorio de trabajo
WORKDIR /usr/app

# Exponer el puerto que la aplicación usará
EXPOSE 8080

# Comando para ejecutar el archivo JAR
ENTRYPOINT ["java", "-jar", "my-app.jar"]

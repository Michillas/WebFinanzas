# Etapa 1: Construcción de la aplicación (Build)
FROM maven:3.9.6-eclipse-temurin-21 AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar todos los archivos del proyecto
COPY . .

# Construir el paquete JAR con Maven
RUN mvn clean package -DskipTests

# Etapa 2: Producción (Run)
FROM eclipse-temurin:21-jre-jammy

# Crear el directorio de trabajo en la imagen final
WORKDIR /usr/app

# Copiar el JAR generado desde la etapa de build
COPY --from=builder /app/target/*.jar ./my-app.jar

# Exponer el puerto que usa la app
EXPOSE 8080

# Comando de arranque
ENTRYPOINT ["java", "-jar", "my-app.jar"]

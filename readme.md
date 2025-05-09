<h1 align="center">💸 Web de Finanzas y Criptomonedas con IA</h1>
<p align="center">Aplicación Web de finanzas y criptomonedas con el uso inteligencia artificial a través de APIs, proyecto final del ciclo formativo de Grado Superior en DAW, realizado durante el año academico 2024/25.</p>

### <p align="center">Made with</p>

<p align="center"><img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"></img> <img src="https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white"></img> <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"></img> <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"></img> <img src="https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white"></img></p>

## <p align="center">https://webfinanzas.vercel.app/</p>

## Inicia el proyecto en tu máquina
Requisitos:
 - Node.js 22 LTS
 - JDK 21
 - MySQL

> 
> ## 1. Clona el repositorio
> ```bash
> git clone https://github.com/Michillas/WebFinanzas-Cripto-y-IA.git
> ```
>
> ## 2. Crea la base de datos en MySQL
> ```sql
> CREATE DATABASE webfinanzas;
> ```
>
> ## 3. Configura el backend (Spring Boot)
> ### application.properties:
> ```properties
> spring.datasource.url=jdbc:mysql://localhost:3306/webfinanzas
> spring.datasource.username=tu_usuario
> spring.datasource.password=tu_contraseña
> ```
>
> ## 4. Inicia el backend (Spring Boot)
> ```bash
> ./mvnw spring-boot:run
> # La API estará disponible en http://localhost:8080/
> ```
>
> ## 5. Inicia el frontend (Next)
> ```bash
> npm install
> npm run dev
> # Accede desde http://localhost:5173
> ```
>

## Inicia con Kubernetes y Docker
Requisitos:
 - Docker
 - Minikube

> ## 1. Compilar imágenes localmente
> ```bash
> docker build -t frontend:latest ./webfinanzas-frontend
> docker build -t backend:latest ./webfinanzas-backend
> ```
>
> ## 2. Cargar imágenes a Minikube
> (Asegurate de que esta minikube encendido "minikube start")
> ```bash
> minikube image load frontend:latest
> minikube image load backend:latest
> ```
>
> ## 3. Aplicar los recursos
> ```bash
> kubectl apply -f kubernetes/
> ```
>
> ## 4. Acceder al microservicio Frontend
> ```bash
> minikube service frontend-service
> ```
> Esto abrirá una URL local para acceder al frontend desplegado en Minikube.


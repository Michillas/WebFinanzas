<h1 align="center">💸 Web de Finanzas y Criptomonedas con IA</h1>
<p align="center">Aplicación Web de finanzas y criptomonedas con el uso inteligencia artificial a través de APIs, proyecto final del ciclo formativo de Grado Superior en DAW, realizado durante el año academico 2024/25.</p>

### <p align="center">Made with</p>

<p align="center"><img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"></img> <img src="https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white"></img> <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"></img></p>

<hr>

## <p align="center">Inicia el proyecto en tu máquina</p>
> 
> ## 1º Clona el repositorio
> ```bash
> git clone https://github.com/Michillas/WebFinanzas-Cripto-y-IA.git
> ```
>
> ## 2º Crea la base de datos en MySQL
> ```sql
> CREATE DATABASE webfinanzas;
> ```
>
> ## 3º Configura el backend (Spring Boot)
> ### application.properties:
> ```properties
> spring.datasource.url=jdbc:mysql://localhost:3306/webfinanzas
> spring.datasource.username=tu_usuario
> spring.datasource.password=tu_contraseña
> ```
>
> ## 4º Inicia el backend (Spring Boot)
> ```bash
> ./mvnw spring-boot:run
> # La API estará disponible en http://localhost:8080/
> ```
>
> ## Inicia el frontend (Next)
> ```bash
> npm install
> npm run dev
> # Accede desde http://localhost:5173
> ```

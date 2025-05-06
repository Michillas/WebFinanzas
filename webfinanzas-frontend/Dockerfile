# Etapa 1: Construcción de la aplicación (Build)
FROM node:22 AS builder

WORKDIR /app

# Copiar los archivos de package.json y package-lock.json (si existe)
COPY package*.json ./
RUN npm install

# Copiar todo el código fuente y construir la aplicación
COPY . .
RUN npm run build

# Etapa 2: Producción (Nginx)
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa anterior
COPY --from=builder /app/.next /usr/share/nginx/html

# Exponer el puerto en el que Nginx va a escuchar
EXPOSE 80

# Comando para iniciar Nginx en el contenedor
CMD ["nginx", "-g", "daemon off;"]
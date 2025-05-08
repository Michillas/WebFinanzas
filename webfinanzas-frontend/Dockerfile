FROM node:22

WORKDIR /app

# Instala dependencias
COPY package*.json ./
RUN npm install

# Copia el código y construye la app
COPY . .
RUN npm run build

# Expón el puerto 3000 (el default de Next.js)
EXPOSE 3000

# Ejecuta Next.js en modo producción
CMD ["npm", "start"]

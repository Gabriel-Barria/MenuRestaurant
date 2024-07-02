# Usa la imagen oficial de Node.js como base
FROM node:14

# Crea un directorio de trabajo
WORKDIR /usr/src/app

# Copia package.json y package-lock.json
COPY package.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente de la aplicación
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]

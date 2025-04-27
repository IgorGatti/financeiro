FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Expõe a porta da aplicação
EXPOSE 3000

# Usa nodemon no modo dev
CMD ["node", "server.js"]
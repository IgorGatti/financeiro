FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação em modo desenvolvimento
CMD ["npm", "run", "dev"]
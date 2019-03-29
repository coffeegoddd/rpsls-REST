FROM node:11.8.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000 3001 3111 5500 6000 4000

CMD ["sh", "-c", "npm run install:all && npm run all:pm2"]
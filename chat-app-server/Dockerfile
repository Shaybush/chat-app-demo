FROM node:latest

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json ./

RUN pnpm install

COPY . .

RUN npm run build

EXPOSE 3001 

CMD ["npm", "start"]
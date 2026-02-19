FROM node:20-bullseye-slim

WORKDIR /app

RUN mkdir -p /app/data

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3001

ENV NODE_ENV=production

CMD ["npx", "tsx", "app.ts"]
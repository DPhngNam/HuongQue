FROM node:22.14.0-alpine

WORKDIR /src

COPY package*.json ./
RUN npm install

COPY . .


EXPOSE 8084

CMD ["npm", "run", "start:dev"]

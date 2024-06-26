FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN npm install
RUN npm install -g nodemon
RUN npx playwright install

COPY . .

EXPOSE 8090

VOLUME ["/app/node_modules"]

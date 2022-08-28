FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

COPY . ./

RUN npm install
RUN npm run build

EXPOSE 3021
CMD [ "node", "dist/server.js" ]
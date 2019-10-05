FROM node:10

WORKDIR /usr/src/app

ADD package.json ./
RUN npm install
COPY . .

EXPOSE 3333

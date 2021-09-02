FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

ENV HTTPS 1


CMD ["npm", "start"]


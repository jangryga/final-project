FROM node:alpine

WORKDIR /app
ENV HTTPS 1
COPY package.json .
RUN npm install
COPY . .



CMD ["npm", "start"]


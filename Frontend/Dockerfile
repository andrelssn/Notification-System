FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- --outputPath=dist

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

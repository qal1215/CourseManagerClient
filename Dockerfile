# Stage 1
FROM node:16-alpine as build
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
RUN npm run build

# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build /app/dist/course-manager-web-app /usr/share/nginx/html

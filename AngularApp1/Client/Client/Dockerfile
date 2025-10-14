# Stage 1: Build the Angular app
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:latest
COPY --from=build /app/dist/client/browser /usr/share/nginx/html
EXPOSE 80

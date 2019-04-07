#https://www.youtube.com/watch?v=etA5xiX5TCA  production deployment
# stage 1
FROM node:latest as node 
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/optimus /usr/share/nginx/html
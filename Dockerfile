# NODE STAGE
FROM node:24-bookworm-slim AS build

# update and upgrade apt packages
RUN apt update && apt upgrade -y

# set working directory
WORKDIR /app

# move package.json and package-lock.json end install dependencies
COPY package*.json ./
RUN npm ci

# copy project files
COPY . .

# choose env file for Docker builds
ARG ENV_FILE=.env.docker
COPY ${ENV_FILE} .env

# build
RUN npm run build

# NGNIX STAGE
FROM nginx:latest

# update and upgrade apt packages
RUN apt-get update && apt-get upgrade -y

# copy nginx config to nginx conf.d folder
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf  


# expose port 80 and start nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

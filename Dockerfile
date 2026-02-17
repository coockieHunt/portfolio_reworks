# NODE STAGE
FROM node:20-bullseye-slim AS build

# set working directory
WORKDIR /app

# move package.json and package-lock.json end install dependencies
COPY package*.json ./
RUN npm ci

# copy project files and build
COPY . .
RUN npm run build

# NGNIX STAGE
FROM nginx:alpine

# copy built files to nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# expose port 80 and start nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

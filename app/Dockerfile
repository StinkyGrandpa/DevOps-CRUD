FROM node:lts-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Build stage completed, begin with new base image
# Remember, copy previously built files into the new image
FROM nginx:alpine AS PROD

# Copy build outputs
COPY --from=build /usr/src/app/dist/app /usr/share/nginx/html

# Copy reverse proxy config file as template to
# enable environment variable substitution
COPY proxy/nginx.conf /etc/nginx/templates/default.conf.template
EXPOSE 80
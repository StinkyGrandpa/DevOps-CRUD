FROM node:lts-alpine AS build
WORKDIR /usr/src/api

# Copy package.json file to install deps
COPY package.json package-lock.json ./
# Install deps
RUN npm install
# Copy all files from current workdir into image
COPY . .
# Build source files
RUN npm run build

# Build stage completed, begin with new base image
# Remember, copy previously built files into the new image
FROM node:lts-alpine AS PROD

# Set working dir in container
WORKDIR /opt/api

# Copy build outputs
COPY --from=build /usr/src/api/dist ./

# Expose application to port 3000
EXPOSE 3000

# Copy package.json to install packages
# required during runtime
COPY package.json package-lock.json ./

# Set nodejs env to production
ENV NODE_ENV=production

# Install production deps
RUN npm install

# Define startup command
ENTRYPOINT ["node", "main.js"]
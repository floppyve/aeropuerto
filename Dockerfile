FROM node:18-bullseye as bot
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
ARG RAILWAY_STATIC_URL
ARG PUBLIC_URL
ARG PORT
ARG VERSION=latest
FROM browserless/chrome:$VERSION
CMD ["npm", "start"]

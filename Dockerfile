FROM node:18-bullseye as bot
WORKDIR /app

#RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
#RUN dpkg -i google-chrome-stable_current_amd64.deb --fix-missing; apt-get -fy install
RUN apt-get update -y
RUN command apt-get install -y chromium-driver


     
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 4000
CMD ["npm", "start"]

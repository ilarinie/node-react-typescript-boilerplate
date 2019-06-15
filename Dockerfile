FROM node:10
WORKDIR /usr/src/app

COPY package*.json ./ 

COPY . .

RUN npm run build

EXPOSE 3001

CMD [ "npm", "start"]
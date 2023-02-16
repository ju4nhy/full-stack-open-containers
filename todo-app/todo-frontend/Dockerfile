FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm install      # did not work without this
RUN npm ci

ENV REACT_APP_BACKEND_URL=http://localhost:3001
ENV CHOKIDAR_USEPOLLING=true

RUN CI=true npm test

RUN npm run build

CMD ["npm", "start"]
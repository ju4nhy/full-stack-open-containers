FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV WATCHPACK_POLLING=true

RUN CI=true npm test

RUN npm run build

CMD ["npm", "start"]
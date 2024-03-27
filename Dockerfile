FROM node:alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./tsconfig.json
COPY nest-cli.json ./nest-cli.json

RUN npm install

RUN npm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
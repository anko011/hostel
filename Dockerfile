FROM node:alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY nest-cli.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine as production


ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production


COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main"]
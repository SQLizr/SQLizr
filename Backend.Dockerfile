   FROM node:alpine
    WORKDIR /usr/src/app
    COPY package.json .
    RUN yarn install
    RUN yarn global add typescript
    COPY . .
    RUN tsc
    CMD ["node", "./dist/src/server/server.js"]
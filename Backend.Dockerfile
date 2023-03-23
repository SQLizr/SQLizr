   FROM node:alpine
    WORKDIR /usr/src/app
    COPY package.json .
    RUN yarn install
    RUN yarn global add esbuild-runner esbuild
    COPY . .
    CMD ["esr", "./src/server/server.ts"]
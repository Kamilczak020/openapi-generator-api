FROM node:19-alpine AS base
RUN apk add openjdk11

FROM base AS dependencies
WORKDIR /app

COPY ../../package.json ./yarn.lock ./
RUN yarn

FROM dependencies as runtime
WORKDIR /app

COPY ../../src ./src
COPY ../../nest-cli.json tsconfig.json ./
COPY --from=dependencies /app/node_modules ./node_modules
ENTRYPOINT ["yarn", "run"]

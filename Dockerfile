FROM node:16.13.1-alpine3.14

RUN apk add --no-cache libc6-compat
RUN apk add git
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn global add typescript
RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]


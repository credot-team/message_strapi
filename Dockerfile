FROM node:16.13.1-alpine3.14 AS build

RUN apk add --no-cache libc6-compat
RUN apk add git
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn global add typescript
RUN yarn build

################################

FROM node:16.13.1-alpine3.14 AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=build /app/. .

USER nextjs

EXPOSE 1337

CMD ["yarn", "start"]



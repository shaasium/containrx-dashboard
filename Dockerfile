FROM node:23-alpine3.21 as builder
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:23-alpine3.21 as runner
WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

RUN yarn install --frozen-lockfile --production

EXPOSE 3000

CMD ["yarn", "start"]

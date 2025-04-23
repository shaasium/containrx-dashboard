FROM node:alpine3.21 AS builder
WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

RUN yarn build

FROM node:alpine3.21 AS runner
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]

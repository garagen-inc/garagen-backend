FROM node:lts-alpine

WORKDIR /usr/src

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

COPY database.sqlite dist/

EXPOSE 3000

CMD ["node", "dist/main.js"]

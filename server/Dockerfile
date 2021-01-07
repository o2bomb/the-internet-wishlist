FROM node:14

# Working directory for application
WORKDIR /usr/src/app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

# Binds to port 4000
EXPOSE 4000

CMD ["yarn", "start"]
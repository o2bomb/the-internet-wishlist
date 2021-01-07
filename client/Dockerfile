FROM node:14

# Working directory for application
WORKDIR /usr/src/app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

# Binds to port 3000
EXPOSE 3000

CMD ["yarn", "start"]
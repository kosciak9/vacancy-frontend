FROM node:stretch


ADD yarn.lock /code/yarn.lock
ADD package.json /code/package.json

WORKDIR /code
RUN yarn --frozen-lockfile

EXPOSE 3000

COPY . /code

RUN yarn run build
RUN yarn add serve

CMD ["yarn", "run", "serve", "-s", "build", "-l", "4000"]

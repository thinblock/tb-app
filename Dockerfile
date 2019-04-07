FROM mhart/alpine-node:8.15

LABEL authors="Hamza Baig"

RUN npm install -g yarn

ADD package.json yarn.lock /tmp/
RUN cd /tmp/ && yarn install

WORKDIR /app
RUN mv /tmp/node_modules/ /app/

ADD . /app

EXPOSE 8889

CMD ["yarn", "start:prod"]

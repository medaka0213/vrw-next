FROM node:18-alpine

ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=$GITHUB_TOKEN

COPY package.json ./
RUN yarn install

COPY . .

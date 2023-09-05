FROM node:16-alpine

ARG GITHUB_TOKEN

WORKDIR /app
COPY . .

RUN npm install

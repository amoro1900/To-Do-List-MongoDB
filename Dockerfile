FROM node:20-slim

EXPOSE 8080

WORKDIR /app

COPY . /app/.

RUN npm ci


ENTRYPOINT ["node" , "index.js"]


# ENTRYPOINT ["node" , "task-generator.js"]
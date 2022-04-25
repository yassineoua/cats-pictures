# STAGE 1
FROM node:14-alpine as builder
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm config set unsafe-perm true
RUN npm install -g typescript
RUN npm install -g ts-node
USER node
RUN npm install
COPY --chown=node:node . .
RUN npm run build

# STAGE 2
FROM node:14-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

ARG DB_CONNECTION
ENV DB_CONNECTION $DB_CONNECTION

ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL

ARG PICTURES_STORAGE_URL
ENV PICTURES_STORAGE_URL $PICTURES_STORAGE_URL


ARG SECRET_KEY
ENV SECRET_KEY $SECRET_KEY

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install --production
COPY --from=builder /home/node/app/build ./build
COPY bootstrap.sh ./


EXPOSE 8000
#ENTRYPOINT [ "node", "./build/server.js"] 
ENTRYPOINT [ "sh", "./bootstrap.sh"] 

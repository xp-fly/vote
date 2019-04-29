FROM keymetrics/pm2:10-slim

WORKDIR /app

RUN mkdir -p /entrypoint.d

COPY entrypoint.d /entrypoint.d

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY ecosystem.config.js /app/ecosystem.config.js
RUN npm install

COPY . /app

RUN npm run prestart:prod

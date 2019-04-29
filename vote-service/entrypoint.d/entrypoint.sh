#!/bin/bash

cd /app

sed -e "s/\${SERVER_PORT}/${SERVER_PORT}/g" \
    -e "s/\${DB_HOST}/${DB_HOST}/g" \
    -e "s/\${DB_PORT}/${DB_HOST}/g" \
    -e "s/\${DB_USERNAME}/${DB_USERNAME}/g" \
    -e "s/\${DB_PASSWORD}/${DB_PASSWORD}/g" \
    -e "s/\${DB_DATABASE}/${DB_PASSWORD}/g" \
    -e "s/\${EMAIL_TRANSPORT}/${EMAIL_TRANSPORT}/g" \
    -e "s/\${EMAIL_FROM}/${EMAIL_FROM}/g" \
    -e "s/\${REDIS_HOST}/${REDIS_HOST}/g" \
    -e "s/\${REDIS_PORT}/${REDIS_PORT}/g" \
    -e "s/\${REDIS_PASSWORD}/${REDIS_PASSWORD}/g" \
        /app/bootstrap.example.yml > /app/bootstrap.yml

pm2 startOrReload ecosystem.config.js

sleep 5
while true ; do
    date +"%F %T Check status..."
    pm2 status
    sleep 60
done

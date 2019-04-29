#!/bin/bash

#cd /app

eval "cat <<EOF
$(< bootstrap.example.yml)
EOF
" > bootstrap.yml

sleep 5
while true ; do
    date +"%F %T Check status..."
    pm2 status
    sleep 60
done

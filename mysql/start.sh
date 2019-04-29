#!/bin/bash
cur_dir=`pwd`
docker stop mysql5.7
docker rm mysql5.7
docker run --name mysql5.7 -v ${cur_dir}/conf/my.cnf:/etc/mysql/my.cnf -v ${cur_dir}/logs:/logs -v ${cur_dir}/data/mysql:/var/lib/mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7

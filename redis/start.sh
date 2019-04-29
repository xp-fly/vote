docker stop redis
docker rm redis
docker run -idt -p 6379:6379 --name redis -v `pwd`/data:/data -v `pwd`/redis.conf:/etc/redis/redis_default.conf hub.c.163.com/public/redis:2.8.4

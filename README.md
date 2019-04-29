# 环境依赖
- centos
- docker

# 目录
```
|- mysql mysql数据目录
|- redis 数据目录
|- vote-service 项目目录
|- |- src 代码文件
|- |- |- common 通用异常过滤器、拦截器
|- |- |- modules 业务模块
|- |- |- |- user 用户模块
|- |- |- |- vote 投票模块
|- |- |- shared 共享模块
|- |- |- |- auth 鉴权模块
|- |- |- |- cache redis缓存
|- |- |- |- database 数据源
|- |- |- |- email 邮件模块
|- |- |- |- job 定时任务
|- |- main.ts 入口文件
 
|- docker-compose.yml  docker启动的compose文件
```

# 启动
- 配置 docker-compose.yml文件
- docker-compose up -d --build --force-recreate 启动

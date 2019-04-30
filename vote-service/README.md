# description

项目目录

# 配置文件
cp bootstrap.example.yml bootstrap.yml

```yaml
port: _SERVER_PORT_ # 启动端口
dataSource:
  host: _DB_HOST_ # 数据库 host 127.0.0.1
  port: _DB_PORT_ # 数据库端口 3306
  username: _DB_USERNAME_ # 数据库用户 root
  password: _DB_PASSWORD_ # 数据库密码 123456
  database: _DB_DATABASE_ # 数据库名称 vote
email:
  transport: _EMAIL_TRANSPORT_ # 邮件服务起的smtps地址 例：smtps://123456789@qq.com:xxxxxxxxxxx@smtp.qq.com
  from: _EMAIL_FROM_ # 邮箱发件人 例 123456789@qq.com
redis:
  host: _REDIS_HOST_  # redis 地址 127.0.0.1
  port: _REDIS_PORT_ # 端口 6379
  password: _REDIS_PASSWORD_ # redis 密码 123456

```

# 启动
npm run start

# 账号

默认管理员账号：123456789@qq.com

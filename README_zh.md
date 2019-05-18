# Mr2.js

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)
[![ZH](https://img.shields.io/badge/EN-README-blue.svg)](https://github.com/txthinking/mr2.js/blob/master/README.md)

Mr2.js 是 [mr2](https://github.com/txthinking/mr2) 的javascript客户端, 可以帮助你将内网服务器暴露在外网.

## 安装

```
$ npm install -g @txthinking/mr2
```

### 用法

```
$ mr2 -c 127.0.0.1:1234
```

## 高级用法

### 使用内置服务器

```
# 将本地服务 127.0.0.1:1234 暴露在外网
$ mr2 -c 127.0.0.1:1234
```

```
# 将本地目录 /path/to/www 暴露在外网
$ mr2 -d /path/to/www
```

```
# 指定一个子域名
$ mr2 -D xxx -c 127.0.0.1:1234
```

```
# 查看内置服务器列表
$ mr2 -l
```

```
# 指定一个内置服务器
$ mr2 -s us.mr2.dev:2222 -c 127.0.0.1:1234
```

```
# 指定一个内置服务器及子域名
$ mr2 -s us.mr2.dev:2222 -D xxx -c 127.0.0.1:1234
```

### 使用自己的 [mr2](https://github.com/txthinking/mr2) 服务器

```
# 将本地服务 127.0.0.1:1234, 暴露在外网: server_address:5678
$ mr2 -s server_address:port -p password -P 5678 -c 127.0.0.1:1234
```

```
# 将本地目录 /path/to/www, 暴露在外网: server_address:5678
$ mr2 -s server_address:port -p password -P 5678 -d /path/to/www
```

## 协议

以 GPLv3 协议开源


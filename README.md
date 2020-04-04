# Mr2.js

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)
[![EN](https://img.shields.io/badge/%E4%B8%AD%E6%96%87-README-blue.svg)](https://github.com/txthinking/mr2.js/blob/master/README_zh.md)


**Deprecated! Please use [https://github.com/txthinking/mr2](https://github.com/txthinking/mr2) instead**

Mr2.js is javascript client with built-in free server of [mr2](https://github.com/txthinking/mr2) can help you expose local server to external network.

## Install

```
$ npm install -g @txthinking/mr2
```

### Usage

```
$ mr2 -c 127.0.0.1:1234
```

## Advanced usage

### Built-in server

```
# expose your local server 127.0.0.1:1234
$ mr2 -c 127.0.0.1:1234
```

```
# expose your local directory /path/to/www
$ mr2 -d /path/to/www
```

```
# Specify a subdomain
$ mr2 -D xxx -c 127.0.0.1:1234
```

```
# View built-in server list
$ mr2 -l
```

```
# Specify a built-in server
$ mr2 -s us.mr2.dev:2222 -c 127.0.0.1:1234
```

```
# Specify a built-in server and subdomain
$ mr2 -s us.mr2.dev:2222 -D xxx -c 127.0.0.1:1234
```

### Customize [mr2](https://github.com/txthinking/mr2) server

```
# Local server is 127.0.0.1:1234, expect to expose: server_address:5678
$ mr2 -s server_address:port -p password -P 5678 -c 127.0.0.1:1234
```

```
# Local web root is /path/to/www, expect to expose: server_address:5678
$ mr2 -s server_address:port -p password -P 5678 -d /path/to/www
```

## License

Licensed under The GPLv3 License

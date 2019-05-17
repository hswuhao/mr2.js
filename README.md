# Mr.2

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)
[![ZH](https://img.shields.io/badge/%E4%B8%AD%E6%96%87-README-blue.svg)](https://github.com/txthinking/mr2.js/blob/master/README_zh.md)

mr2.js is js client of [mr2](https://github.com/txthinking/mr2).

> [mr2](https://github.com/txthinking/mr2) can help you expose local server to external network. Support both TCP/UDP, of course support HTTP.<br/>

### Install

```
$ npm install -g todo
```

### Usage

#### Built-in server

```
# Local server is 127.0.0.1:1234
$ mr2 -c 127.0.0.1:1234
```

```
# Local web root is /path/to/www, expect to expose: server_address:5678
$ mr2 -d /path/to/www
```

#### Customize server

```
# Local server is 127.0.0.1:1234, expect to expose: server_address:5678
$ mr2 -s server_address:port -p password -P 5678 -c 127.0.0.1:1234
```

```
# Local web root is /path/to/www, expect to expose: server_address:5678
$ mr2 client -s server_address:port -p password -P 5678 --clientDirectory /path/to/www
```

## License

Licensed under The GPLv3 License

#!/usr/bin/env node

var path = require('path');
var {execSync} = require('child_process');
var addrToIPPort = require('addr-to-ip-port');
var a = require('commander');
a
  .version('20190616')
  .option('-s, --server <server>', 'Like: 1.2.3.4:5, default choose one from built-in server list')
  .option('-p, --password <password>', 'Like: xxx, default choose one from built-in server list')
  .option('-D, --serverDomain <serverDomain>', 'Subdomain, like: xxx, default use your machineid, only works with built-in server')
  .option('-P, --serverPort <serverPort>', 'Like: 10000, only works with customize server')
  .option('-c, --clientServer <clientServer>', 'Like: 127.0.0.1:3000')
  .option('-d, --clientDirectory <clientDirectory>', 'Like: /path/to/www. Ignore clientServer')
  .option('-l, --list', 'Print built-in server list')
a.on('--help', () => {
    console.log('')
    console.log('Examples:');
    console.log('')
    console.log('  # built-in server');
    console.log('  $ mr2 -c 127.0.0.1:3000');
    console.log('  $ mr2 -d /path/to/www');
    console.log('  $ mr2 -D subdomain -c 127.0.0.1:3000');
    console.log('  $ mr2 -D subdomain -d /path/to/www');
    console.log('')
    console.log('  # customize server');
    console.log('  $ mr2 -s 1.2.3.4:5 -p password -P 10000 -c 127.0.0.1:3000');
    console.log('  $ mr2 -s 1.2.3.4:5 -p password -P 10000 -d /path/to/www');
    console.log('')
});
a.parse(process.argv);
if(!a.server){
    a.server = '';
}
if(!a.password){
    a.password = '';
}
if(!a.serverPort){
    a.serverPort = 0
}
if(!a.serverDomain){
    a.serverDomain = '';
}
if(!a.clientServer){
    a.clientServer = '';
}
if(!a.clientDirectory){
    a.clientDirectory = '';
}

(async () => {
    if(a.list){
        try{
            var r = await require('superagent')
            .get('https://raw.githubusercontent.com/txthinking/mr2.js/master/server.json');
            console.log(JSON.stringify(JSON.parse(r.text), null, 2));
        }catch(e){
            console.log(e.response ? e.response.text : e.message);
        }
        return;
    }
    if(a.server && a.server.indexOf('mr2.dev') !== -1){
        try{
            var r = await require('superagent')
            .get('https://raw.githubusercontent.com/txthinking/mr2.js/master/server.json');
            var l = JSON.parse(r.text);
            var l = l.filter(v=>v.server===a.server);
            if(!l.length){
                console.log('Can not find this built-in server');
                return;
            }
            var o = l[0];
            a.server = o.server;
            a.password = o.password;
            a.port = o.port;
        }catch(e){
            console.log(e.response ? e.response.text : e.message);
            return;
        }
    }
    if(!a.server){
        try{
            var r = await require('superagent')
            .get('https://raw.githubusercontent.com/txthinking/mr2.js/master/server.json');
            var l = JSON.parse(r.text);
            var o = l[0];
            a.server = o.server;
            a.password = o.password;
            a.port = o.port;
        }catch(e){
            console.log(e.response ? e.response.text : e.message);
            return;
        }
    }
    if(!a.password){
        a.outputHelp();
        return;
    }
    if(a.server.indexOf('mr2.dev') === -1){
        a.serverDomain = '';
    }
    if(a.server.indexOf('mr2.dev') !== -1){
        a.serverPort = 0;
    }
    if(a.server.indexOf('mr2.dev') === -1){
        if(!a.serverPort){
            a.outputHelp();
            return;
        }
    }
    if(a.server.indexOf('mr2.dev') !== -1){
        if(!a.serverDomain){
            var {machineIdSync} = require('node-machine-id');
            var md5 = require('md5');
            a.serverDomain = md5(machineIdSync());
        }
    }
    if(!a.clientServer && !a.clientDirectory){
        a.outputHelp();
        process.exit(0);
    }

    var bin = 'mr2';
    if (process.platform === 'linux') {
        bin = path.join(__dirname, 'binary/mr2');
    }
    if (process.platform === 'darwin') {
        bin = path.join(__dirname, 'binary/mr2_darwin_amd64');
    }
    if (process.platform === 'windows') {
        bin = path.join(__dirname, 'binary\\mr2_windows_amd64.exe');
    }

    try{
        if(a.server.indexOf('mr2.dev') === -1){
            console.log(`${addrToIPPort(a.server)[0]}:${a.serverPort}`);
            if(a.clientDirectory){
                var s = execSync(`${bin} client -s ${a.server} -p ${a.password} -P ${a.serverPort} --clientDirectory ${a.clientDirectory}`, {
                    encoding: 'utf8',
                });
                console.log(s);
                return;
            }
            if(a.clientServer){
                var s = execSync(`${bin} client -s ${a.server} -p ${a.password} -P ${a.serverPort} -c ${a.clientServer}`, {
                    encoding: 'utf8',
                });
                console.log(s);
                return;
            }
            return;
        }
        if(a.server.indexOf('mr2.dev') !== -1){
            console.log(`https://${a.serverDomain}.${addrToIPPort(a.server)[0]}:${a.port}`)
            if(a.clientDirectory){
                var s = execSync(`${bin} client -s ${a.server} -p ${a.password} -D ${a.serverDomain} --clientDirectory ${a.clientDirectory}`, {
                    encoding: 'utf8',
                });
                console.log(s);
                return;
            }
            if(a.clientServer){
                var s = execSync(`${bin} client -s ${a.server} -p ${a.password} -D ${a.serverDomain} -c ${a.clientServer}`, {
                    encoding: 'utf8',
                });
                console.log(s);
                return;
            }
            return;
        }
    }catch(e){
        console.log("Please check:");
        console.log("  Use -P when server run as port mode");
        console.log("  Use -D when server run as domain mode");
        console.log("  Domain or port may be occupied by other clients");
        console.log("  Your password");
    }
})();

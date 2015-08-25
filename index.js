let http = require('http')
let path = require('path')
let fs = require('fs')
let argv = require('yargs')
.default('host', '127.0.0.1')
.argv
let argv1 = require('yargs')
.default('log', '/log/app1.log')
.argv


let scheme = 'http://'
// Build the destinationUrl using the --host value
let port = argv.port || (argv.host === '127.0.0.1' ? 8000 : 8000)
let destinationUrl = argv.url || scheme + argv.host + ':' + port
let logPath = argv1.log
console.log('url =>' + destinationUrl);
console.log('host=>' + argv.host);
console.log('port=>' + port);
console.log('logpath=>' + logPath);
//let getLogStream = () => logPath ? fs.createWriteStream(logPath) : process.stdout
let logStream = logPath ? fs.createWriteStream(logPath) : process.stdout
http.createServer((req, res) => {
console.log(`Request received at: ${req.url}`)
for(let header in req.headers) {
res.setHeader(header, req.headers[header]);
}
req.pipe(res)
//res.end('hello world\n')
logStream.write('\n' + JSON.stringify(req.headers))
req.pipe(logStream, {end: false})
}).listen(port)
http.createServer((req, res) => {
console.log(`Proxying request to: ${destinationUrl + req.url}`)
let request = require('request')
//let destinationUrl = '127.0.0.1:8000'
let options = {
headers: req.header,
url: `${destinationUrl}${req.url}`
}
// Log the proxy request headers and content in our server callback
logStream.write(JSON.stringify(request(options)))
req.pipe(logStream, {end: false})
//request(options)
request(options).pipe(res)
options.method = req.method
req.pipe(request(options)).pipe(res)
}).listen(8001)


# proxyserver
1)Takes a port and host from command line argument and redirect to the given host
2)Command to run 
nodemon --exec babel-node -- --optional strict --log --stage 1 -- index.js --host=127.0.0.1 --port 8002
Sets the post to 8002 and redorected host to 127.0.0.1 and default loggins to /log/app1/log
3)Once the server starts you can see the following logs
24 Aug 22:10:50 - [nodemon] v1.4.1
24 Aug 22:10:50 - [nodemon] to restart at any time, enter `rs`
24 Aug 22:10:50 - [nodemon] watching: *.*
24 Aug 22:10:50 - [nodemon] starting `babel-node --optional strict --log --stage 1 -- index.js --host=127.0.0.1 --port 8002`
url =>http://127.0.0.1:8002
host=>127.0.0.1
port=>8002
logpath=>/log/app1.log
Proxying request to: http://127.0.0.1:8002/asdf
Request received at: /asdf
Request received at: /asdf
Request received at: /asdf

4)Run a curl command to redirect to a host
curl -v http://127.0.0.1:8001/asdf -d "hello proxy"

You can see the following messages


* About to connect() to 127.0.0.1 port 8001 (#0)
*   Trying 127.0.0.1...
* Adding handle: conn: 0x7fa67b803a00
* Adding handle: send: 0
* Adding handle: recv: 0
* Curl_addHandleToPipeline: length: 1
* - Conn 0 (0x7fa67b803a00) send_pipe: 1, recv_pipe: 0
* Connected to 127.0.0.1 (127.0.0.1) port 8001 (#0)
> POST /asdf HTTP/1.1
> User-Agent: curl/7.30.0
> Host: 127.0.0.1:8001
> Accept: */*
> Content-Length: 11
> Content-Type: application/x-www-form-urlencoded
> 
* upload completely sent off: 11 out of 11 bytes
< HTTP/1.1 200 OK
< host: 127.0.0.1:8002
< user-agent: curl/7.30.0
< accept: */*
< content-length: 11
< content-type: application/x-www-form-urlencoded
< connection: close
< date: Tue, 25 Aug 2015 05:18:04 GMT
< 
* Closing connection 0
 

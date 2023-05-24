//导入http模块

const http = require('http')

// 创建web服务器实例

const server = http.createServer()

// 为服务器绑定request事件

server.on('request', (req, res) => {
  // req是请求对象，它包含了与客户端相关的数据和属性，例如：req.url 是客户端请求的url地址，req.method 是客户端请求的方法
  console.log('Someone visit our web server')
})

// 启动服务器

server.listen(80, function () {
  console.log('server running at http://127.0.0.1')
})
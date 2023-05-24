// 导入express框架
const express = require('express');

// 导入path模块
const path = require('path');

// 创建web服务器
const app = express();

// 对外提供静态资源:如果向暴露多个静态资源模块，可调用express.static多次
app.use(express.static(path.join(__dirname, '../clock')));

// 想在访问静态资源前加路径前缀
app.use('/public', express.static(path.join(__dirname, '../public')))

// 通过get方法可以监听客户端的get请求
/* 1.接收两个参数
 1.1参数1：客户端请求的url地址
 1.2请求对应的处理函数
  1.2.1：req：请求的对象，包含了与请求相关的属性和方法
  1.2.2“res:响应对象，包含了与相应相关的属性和方法
 */
app.get('/userInfo', function (req, res) {
  // 调用express提供的res.send()方法，向客户端响应一个JSON对象
  res.send({ name: 'zs', age: 22, gender: '男' })
});

// post请求与get请求类似
app.post('/submitForm', function (req, res) {
  res.send('请求成功')
});

// 获取url传参
app.get('/', (req, res) => {
  res.send(req.query)
})

// 获取url中动态参数:id是一个动态参数
app.get('/deleteUser/:userId', (req, res) => {
  res.send(req.params)
})

// 启动服务器
app.listen(8081, () => {
  console.log('express server running at http://127.0.0.1:8081')
});


const express = require('express');

const path = require('path');

const app = express();

// 定义一个简单的中间件
const mw = function (req, res, next) {
  console.log('简单的中间件');
  next()
}

// 创建局部中间件
const mw1 = function (req, res, next) {
  console.log('局部中间件生效')
}
app.get('/', mw1, function (req, res) {
  console.log('')
})

app.listen(8081, () => {
  console.log('express server run at http://127.0.0.1:8081')
})
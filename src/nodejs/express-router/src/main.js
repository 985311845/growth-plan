// 导入express
const express = require('express');

// 引入path模块
const path = require('path')

// 引入路由模块
const userRouter = require(path.join(__dirname, './router/user'))

// 创建服务器实例
const app = express();

// 使用app.use注册路由模块
app.use(userRouter)

// 给路由添加统一的前缀
app.use('/api', userRouter)

// 启动服务
app.listen(8081, () => {
  console.log('express server run at:http://127.0.0.1:8081')
})


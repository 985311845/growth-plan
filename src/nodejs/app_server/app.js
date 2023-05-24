// 引入express框架
const express = require('express');

// 配置跨域
const cors = require('cors');

// 创建一个服务
const app = express();

// 挂载中间件：
// 跨域中间件
app.use(cors());
// 解析表单数据中间件：application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// 导入并注册路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter)

// 启动服务
app.listen(3007, () => {
  console.log('app server running at http://127.0.0.1:3007')
})
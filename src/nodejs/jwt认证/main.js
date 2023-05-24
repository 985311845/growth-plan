const express = require('express');

const session = require('express-session');

const cors = require('cors');

const path = require('path')

const { expressjwt: jwt } = require("express-jwt");

// 定义secret密钥
const secretKey = 'itheima No1 ^_^'

const Router = require(path.join(__dirname, './interfice'))

const app = express();

// expressJWT就是用来解析Token的中间件
// .unless({path:[/^\/api\//]})用来指定哪些接口不需要访问权限:以/api/开头的接口不需要权限认证
// 注意：只要配置成功了express-jwt这个中间件，就可以把解析出来的用户信息，挂载到req.user属性上
app.use(jwt({ secret: secretKey, algorithms: ["HS256"], }).unless({ path: [/^\/api\//] }))

app.use(cors())

app.use(express.urlencoded({ extended: false }))

app.use(session({
  secret: 'itheima',
  resave: false,
  saveUninitialized: true
}));

app.use('/api', Router.router)


app.listen(80, () => {
  console.log('express server running at:http://127.0.0.1')
})
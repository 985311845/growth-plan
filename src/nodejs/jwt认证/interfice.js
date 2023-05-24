const express = require('express');

const jwt = require('jsonwebtoken');

const router = express.Router();

// 定义secret密钥
const secret = 'itheima No1 ^_^'

// 登录接口
router.post('/login', (req, res) => {
  // console.log('进来了')
  console.log(req.body)
  // 判断用户提交的信息是否正确
  if (req.body.username !== 'admin' || req.body.password !== '000000') {
    return res.send({
      status: 1,
      msg: '登录失败'
    })
  }
  // 将用户的信息存储在session中
  req.session.user = req.body;
  // 将用户的登录状态存储到session中
  req.session.idlogin = true;

  res.send({
    status: 0,
    msg: '登录成功',
    token: jwt.sign({ username: req.body.username }, secret, { expiresIn: '30s' })
  })
})

// 获取用户姓名
router.get('/userInfo', (req, res) => {
  // 判断用户是否登录
  if (!req.session.isLogin) {
    return res.send({
      status: 1,
      msg: 'fail'
    })
  }
  res.send({
    status: 0,
    msg: 'success',
    username: req.session.user.username
  })
})

// 推出登录，清空session
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.send({
    status: 0,
    msg: '退出成功'
  })
})

// 有权限的API
router.get('/admin/getInfo', (req, res) => {
  res.send({
    data: req.user
  })
})

module.exports = {
  router
}
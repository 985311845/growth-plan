const express = require('express');

const router = express.Router();

// 登录接口
router.post('/login', (req, res) => {
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
    msg: '登录成功'
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

module.exports = {
  router
}
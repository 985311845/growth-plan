const express = require('express');

// 创建理由实例对象
const router = express.Router();

// 引入路由处理函数
const userHandler = require('../router_handler/user')

// 注册新用户
router.post('/reguser', userHandler.reguser);

// 登录
router.post('/login', userHandler.login)

// 将路由对象共享出去
module.exports = router


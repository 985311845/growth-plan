// 导入express
const express = require('express');

// 创建路由对象
const router = express.Router();

// 挂载路由
router.get('/user/list', function (req, res) {
  res.send('Gen user list')
})

router.post('/user/add', function (req, res) {
  console.log('Add new user')
})

// 导出路由对象
module.exports = router;
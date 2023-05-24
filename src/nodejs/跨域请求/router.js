const express = require('express');

const router = express.Router();

router.get('/user', (req, res) => {
  let data = req.query;
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(data)
})

router.post('/bookname', (req, res) => {
  let data = req.body;
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(data.bookname,'1111')
})

module.exports = {
  router
}
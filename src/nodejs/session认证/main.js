const express = require('express');

const session = require('express-session');

const path = require('path')

const Router = require(path.join(__dirname, './interfice'))

const app = express();

app.use(session({
  secret: 'itheima',
  resave: false,
  saveUninitialized: true
}));

app.use('/api', Router.router)


app.listen(8081, () => {
  console.log('express server running at:http://127.0.0.1:8081')
})
const express = require('express');

const path = require('path');

// const cors = require('cors')



const Router = require(path.join(__dirname, './router'));

const app = express();

// app.use(cors())



app.use('/api', Router.router)

app.listen('80', () => {
  console.log('express server running at:http://127.0.0.1')
})
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const prot = 3000;

app.post('/login', (req, res) => {
    console.log(req.body)
});

app.listen(prot, () => {
    console.log('服务器启动成功')
})
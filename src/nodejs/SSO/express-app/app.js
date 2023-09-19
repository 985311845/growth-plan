const myexpress = require("express");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

const publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1x52UvpkqquYfH5aP+l4
k89nyy5JqYusycMDTcxBljsELq6kEw5AfUhCNKwLS/PnQP2b12/HzK8CMlJTdarD
BYBXdQyu/KZ4LXzxdJj+rnrJWtnMASnOxGk6bgPk3L4FzN2pOvv0Me7Xs6xc9ehc
1b1K/8MiHBn4RGQMxfkV3ogOUsjYRl15jL5Q5Xo6LekQI3JZtwSoybwqHTHlS0VP
Yif0C6ealoI4rCyQ8Gc5F1PHat5u8FOxRVyRxWNa2CKkmDgvOWQBo2okqclv9RLj
2CjRL/8AU7kSD1DeDZ+u5wBWLOGg4vZ9y9llKA2GWp5GRRk5zjjkFZHUuzNZJ9GW
mwIDAQAB`
const privateKey = `MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDXHnZS+mSqq5h8
flo/6XiTz2fLLkmpi6zJwwNNzEGWOwQurqQTDkB9SEI0rAtL8+dA/ZvXb8fMrwIy
UlN1qsMFgFd1DK78pngtfPF0mP6uesla2cwBKc7EaTpuA+TcvgXM3ak6+/Qx7tez
rFz16FzVvUr/wyIcGfhEZAzF+RXeiA5SyNhGXXmMvlDlejot6RAjclm3BKjJvCod
MeVLRU9iJ/QLp5qWgjisLJDwZzkXU8dq3m7wU7FFXJHFY1rYIqSYOC85ZAGjaiSp
yW/1EuPYKNEv/wBTuRIPUN4Nn67nAFYs4aDi9n3L2WUoDYZankZFGTnOOOQVkdS7
M1kn0ZabAgMBAAECggEAUdp0eYRvU4WxowVM/+6tg8iynNxDCTFtkOQUWMD0394a
7ExlgB63KTSahIJGViM7hj4501LkOp0I/+7VdPuB85DvNkmaN+Z76gsVsSEaH3f3
MAuZlYO7+n5zzjLLHbdsa5SYdSozs+BG0UYvpR5CXM4HQKSWUQ0Mq7FKLvZlfOOj
IQkap1pMdFmWfvG4iUW2vdi5U2aL6ueXqVi31MHuVcvM6jyyY7H/TVbIRRnwd93v
adg2rETu3wjdhYoAzd6J5Sr5bx9LtXj3Q09fEP64SxUz8wmbKkWsDZ1wVBoRCxyj
bDd+ckqyWrOK1qQMK9g85YF/s3CVvUpMx/YRVvgdEQKBgQD/IrzdyQCns5MV6nf7
ZcvMQdzp3YIW/P7ck9Csa3Owf1oOh1RUdeo3BBxPcvKQoQt7EL87zkSGHarLJ5rt
Fz4672Iockrl48LmEq66+8bxSJ+fjl1+YxnPsYDunwUNavCUh7CUxKZeDYCMJiyT
xOSfoSs8qqukx6dV2XVWkPqRwwKBgQDX2QVHLmskgKAT/tsy/x3EnqU+nP55rjv8
+IEA474qdqmHDMshvbV9dZ272aQcf8jS9dvkMZ24EJFxYosgsFxUrdjdK05Wspk0
GH/FQxHEklVZ1H4ZOBMA6yhwG/MPPDYK6g5Po6UGwJiqQTMjWU5tNJecE2FMGM9s
fjIVTbOCSQKBgCln7dbgpCaTUi+gWdCG+MgxeDTMKiyo6oPJyXfyCFiAkpEBDYKX
kGdVV3LdaNhoCoDyetat5xkM/4bw6ofH2eWerAN8aQNeL2c/aPQXoHXQH3e5lxrH
4ox+djpDvIIs9NZmHxZFw+pHrrEQEPP6ZFAzy9yQpkKb1GBuZkiiRsgZAoGAHeKs
emiQ6SLuBxa4Xt03z+tvUbYG/e4D3EjEA82EnPiFDG/XCDruEAri5gmCUXfX5G2q
HnRINB4HJT3RqZsBja/sYOMIG7TqxW3G8xcQNLlWG/Px6af76ZqlpLAZ/TgG+4fg
p2IvDTpJaPlSDUjmNPSdMTz1scWVop3ubUiu3BECgYEAx1JpbAC6ifjqQ6rycRIp
d59QJhGlIIcWRAVlB1WM5hxJWhojbUsUpiMtkAtteccporoR8V5b2OKUtWk48XyG
yVEQrpBIv+Mfwob4lMTs9WqeMfUGhXp9WDNOTEkl0rd3XVD8nGK2xak3lYbVSrLb
oWcZ1qCsmizga97wbA300kg=`

let token = '';

const app = myexpress();

// 设置接受的请求信息，设置跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //  res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,X_Requested_With,Content-Type");
    res.header("Access-Control-Allow-Methods", 'PUT, POST, GET, DELETE, OPTIONS');
    //res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// 设置post请求
app.use(bodyParser.json({ limit: "2048kb" }));  // 限制数据最大2MB
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', (req, res) => {
    let { username, password } = req.body;
    if (username === 'admin' && password == '123456') {
        let playload = {
            username,
            password
        }
        let toket = jwt.sign(playload, privateKey, { expiresIn: '5m' });
        token = toket;
        res.json({
            code: 200,
            msg: '登录成功',
            token: toket
        })
    } else {
        res.json({
            msg: '用户名密码错误，登录失败'
        })
    }
});

app.post('/login4A', (req, res) => {
    console.log(req)
    let { ssotoken } = req.body;
    // let info = jwt.decode(ssotoken);
    jwt.verify(ssotoken, privateKey, (err, data) => {
        if (!ssotoken) {
            res.send({
                code: 401
            });
            return;
        } else if (err && err.message == 'jwt expired') {
            res.send({
                code: 401,
                msg: 'token已过期'
            });
            return;
        } else if (err && err.message == 'invalid token') {
            res.send({
                code: 401,
                msg: 'token无效'
            });
            return;
        }
        res.send({
            code: 200
        });
    });
    // res.send({
    //     code: 401
    // });
});

// 配置服务端口监听
app.listen(9999, function () {
    console.log("服务启动,端口号9999");
})

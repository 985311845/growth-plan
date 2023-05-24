const mysql = require('mysql');

const db = mysql.createPool({
  host: '127.0.0.1',    //数据库的主机ip
  user: 'root',
  password: 'admin123',
  database: 'my_db_01'  //指定要操作那个数据库
});

// db.query('select * from users', (err, result) => {
//   if (err) console.log(err.message)
//   console.log(result)
// })

/*// 向数据库中插入一条数据
const user = { username: 'Spider-Man', password: 'pcc123' };
// 用?作为占位符
const sql = 'insert into users (username,password) values (?,?)';

db.query(sql, [user.username, user.password], (err, result) => {
  if (err) console.log(err.message);
  if (result.affectedRows === 1) {
    console.log('添加成功')
  }
})*/

// 插入数据的简写方式
const user2 = { username: 'Spider-Man2', password: 'pcc654' };

const sql2 = 'insert into users set ?'

db.query(sql2, user2, (err, result) => {
  if (err) {
    console.log(err.message);
    return
  }
  if (result.affectedRows === 1) {
    console.log('调价成功')
  }
})
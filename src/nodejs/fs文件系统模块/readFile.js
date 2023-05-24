const fs = require('fs')

fs.readFile("./1.txt", 'utf8', function (err, dataStr) {
  console.log(dataStr)
})
fs.readFile('./index.js', 'utf8', function (err, dataStr) {
  console.log(dataStr)
})
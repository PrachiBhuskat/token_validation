const mysql = require('mysql');

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'users'
});

conn.connect((err)=>
{
  if (err) throw err;
  else
  console.log('connected'); 
 
})
module.exports = conn;


const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.DB_HOST || process.env.MYSQLHOST,
  user: process.env.DB_USER || process.env.MYSQLUSER,
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
  database: process.env.DB_DATABASE || process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE || 'railway',
  port: process.env.DB_PORT || process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, conn) => {
  if (err) {
    console.log('DB Connection Failed:', err.message);
  } else {
    console.log('DB Connected Successfully!');
    conn.release();
  }
});

module.exports = db;

const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Database connected...');
  }
});

module.exports = db;

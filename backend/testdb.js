const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'srv1864.hstgr.io',
  user: process.env.DB_USER || 'u743507397_GeoPark123',
  password: process.env.DB_PASSWORD || 'Geoooooooooooooooo12',
  database: process.env.DB_NAME || 'u743507397_GeoPark123',
  port: process.env.DB_PORT || 3306
});

connection.connect(err => {
  if (err) {
    console.error('❌ Error koneksi database:', err.message);
    return;
  }
  console.log('✅ Terhubung ke MySQL');
  connection.query('SELECT 1', (err, results) => {
    if (err) {
      console.error('❌ Query gagal:', err.message);
    } else {
      console.log('✅ Query berhasil:', results);
    }
    connection.end();
  });
});
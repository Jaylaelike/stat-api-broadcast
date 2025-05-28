import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.HOST_SQL,
  user: process.env.USER_SQL,
  password: process.env.PASSWORD_SQL,
  database: process.env.DATABASE_SQL,
  port: parseInt(process.env.PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to the database.');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
    // Exit process on critical connection failure
    process.exit(1); 
  });

export default pool;

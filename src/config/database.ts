import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: "10.0.1.225",
  user: "thaipbs",
  password: "thaipbs",
  database: "broadcast_monitor",
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

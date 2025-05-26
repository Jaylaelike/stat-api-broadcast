import app from './app';
import pool from './config/database'; // Ensures database connection is initialized

const PORT = process.env.PORT || 3000;

// Test database connection by getting a connection from the pool
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to the database via server.ts.');
    connection.release();
    
    // Start the server only after a successful DB connection test
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to the database. Server not started.', err);
    process.exit(1); // Exit if DB connection fails
  });

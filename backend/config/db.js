const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: "expense_tracker",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to MySQL database");

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL
    )
  `;

  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating table:", err.message);
    } else {
      console.log("Users table created");
    }
  });
});

module.exports = connection;

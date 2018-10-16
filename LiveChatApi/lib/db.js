const mysql = require('mysql');
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'sedc_chat'
});

/**
 * Create required tables
 */
db.connect((err) => {
  if (err) {
    console.log('Error connecting mysql: ', err);
  }
  /**
   * Users table
   */
  db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id            INT          NOT NULL PRIMARY KEY AUTO_INCREMENT,
      full_name     VARCHAR(255) NOT NULL,
      profile_image TEXT         NOT NULL,
      username      VARCHAR(255) NOT NULL,
      email         VARCHAR(255),
      password      VARCHAR(60),
      created_at    TIMESTAMP    NOT NULL
    );
  `, (error, result, fields) => {
    if (error) {
      console.log(error);
    }
  });
  /**
   * Rooms table
   */
  db.query(`
    CREATE TABLE IF NOT EXISTS chat_rooms (
      id         INT          NOT NULL PRIMARY KEY AUTO_INCREMENT,
      room_name  VARCHAR(255) NOT NULL,
      user_id    INT(11)      NOT NULL,
      created_at TIMESTAMP    NOT NULL
    );
  `, (error, result, fields) => {
    if (error) {
      console.log(error);
    }
  });
});
module.exports = db;
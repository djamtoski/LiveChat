const express = require('express');
const router = express.Router();
const db = require('./db');
const crypto = require('crypto');


/**
 * Add new user
 */
router.post('/users/add', (req, res) => {
  if (req.body.fullName &&
    req.body.username &&
    req.body.email &&
    req.body.password &&
    req.body.confirmPassword) {

    db.query(`
          INSERT INTO users (full_name, profile_image, username, email, password, created_at)
          VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP);
      `,
      [
        req.body.fullName,
        req.body.profileImage,
        req.body.username,
        req.body.email,
        crypto.createHash('md5').update(req.body.password).digest('hex')
      ]
      , (error, result, fields) => {
        if (error) {
          console.log(error);
          res.json(error);
        }
        res.json(result.affectedRows);
      });
  }
});
/**
 * Add product
 */
router.post('/login', (req, res) => {
  req.session.regenerate(function (err) {
    // will have a new session here
  });
  if (typeof req.body.username === 'undefined' || !req.body.username) {
    res.status(500).json({error: 'Username and password are required'});
    return;
  } else {
    db.query(`
    SELECT id, full_name, profile_image, username, email
    FROM users 
    WHERE username='${req.body.username}' AND password='${crypto.createHash('md5').update(req.body.password).digest('hex')}'
    LIMIT 1;
    `, (error, result, fields) => {
      if (error) {
        res.status(500).json({error});
      } else if (result.length === 1) {
        let data = {
          SSID: req.session.id
        };
        Object.assign(data, result[0]);
        res.status(200).json(data);
      } else {
        res.status(500).json({error: 'Invalid login details'});
      }
    });
  }
});

/**
 * Get all users
 */
router.post('/all', (req, res) => {
  db.query('SELECT * FROM users WHERE id NOT IN(?)', [req.body.cid], (error, result, fields) => {
    if (error) {
      res.status(500).json({error});
    }
    res.status(200).json(result);
  });
});

/**
 * Create room
 */
router.post('/create-room', (req, res) => {
  db.query('INSERT INTO chat_rooms (room_name, user_id, created_at) VALUES(?, ?, CURRENT_TIMESTAMP)', [
    req.body.roomName,
    req.body.userId
  ], (error, result, fields) => {
    if (error) {
      res.status(500).json({error});
    }

    res.status(200).json(result.affectedRows);
  });
});

router.get('/get-all-rooms', (req, res) => {
  db.query('SELECT id, room_name, user_id, created_at FROM chat_rooms', (error, result, fields) => {
    if (error) {
      res.status(500).json(error)
    }
    res.status(200).json(result);
  });
});
/**
 * End of routes section
 */

module.exports = router;
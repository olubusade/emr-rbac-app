const db = require('../config/db'); // Database connection

// User model
const User = function(user) {
  this.username = user.username;
  this.password = user.password;
  this.role_id = user.role_id;
};

// Fetch all users
User.getAll = (result) => {
  db.query('SELECT * FROM users', (err, res) => {
    if (err) {
      console.error('Error fetching users: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// Create a new user
User.create = (newUser, result) => {
  db.query('INSERT INTO users SET ?', newUser, (err, res) => {
    if (err) {
      console.error('Error creating user: ', err);
      result(null, err);
    } else {
      result(null, res.insertId);
    }
  });
};

// Fetch a user by username
User.getByUsername = (username, result) => {
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, res) => {
    if (err) {
      console.error('Error fetching user: ', err);
      result(null, err);
    } else {
      result(null, res[0]);
    }
  });
};

module.exports = User;

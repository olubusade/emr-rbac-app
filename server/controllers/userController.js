const User = require('../models/user');

// Fetch all users
exports.getAllUsers = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      });
    } else {
      res.send(data);
    }
  });
};

// Create a new user
exports.createUser = (req, res) => {
  const newUser = new User(req.body);
  User.create(newUser, (err, userId) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the user.',
      });
    } else {
      res.send({ id: userId });
    }
  });
};

const db = require('../config/db'); // Database connection

// Role model
const Role = function(role) {
  this.name = role.name;
};

// Fetch all roles
Role.getAll = (result) => {
  db.query('SELECT * FROM roles', (err, res) => {
    if (err) {
      console.error('Error fetching roles: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// Create a new role
Role.create = (newRole, result) => {
  db.query('INSERT INTO roles SET ?', newRole, (err, res) => {
    if (err) {
      console.error('Error creating role: ', err);
      result(null, err);
    } else {
      result(null, res.insertId);
    }
  });
};

module.exports = Role;

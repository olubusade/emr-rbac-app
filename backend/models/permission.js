const db = require('../config/db'); // Database connection

// Permission model
const Permission = function(permission) {
  this.resource = permission.resource;
  this.viewme = permission.viewme;
  this.readme = permission.readme;
  this.writeme = permission.writeme;
  this.updateme = permission.updateme;
};

// Fetch all permissions
Permission.getAll = (result) => {
  db.query('SELECT * FROM permissions', (err, res) => {
    if (err) {
      console.error('Error fetching permissions: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// Create a new permission
Permission.create = (newPermission, result) => {
  db.query('INSERT INTO permissions SET ?', newPermission, (err, res) => {
    if (err) {
      console.error('Error creating permission: ', err);
      result(null, err);
    } else {
      result(null, res.insertId);
    }
  });
};

module.exports = Permission;

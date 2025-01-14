const db = require('../config/db'); // Database connection

// Role-Permission model
const RolePermission = function(rolePermission) {
  this.role_id = rolePermission.role_id;
  this.permission_id = rolePermission.permission_id;
};

// Fetch all role-permission mappings
RolePermission.getAll = (result) => {
  db.query('SELECT * FROM role_permissions', (err, res) => {
    if (err) {
      console.error('Error fetching role_permissions: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// Create a new role_permission mapping
RolePermission.create = (newRolePermission, result) => {
  db.query('INSERT INTO role_permissions SET ?', newRolePermission, (err, res) => {
    if (err) {
      console.error('Error creating role_permission mapping: ', err);
      result(null, err);
    } else {
      result(null, res.insertId);
    }
  });
};

module.exports = RolePermission;

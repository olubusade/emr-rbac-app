const db = require('../config/db');

module.exports.checkPermission = (resource, action) => {
  return (req, res, next) => {
    const { id } = req.user;

    const query = `
      SELECT p.${action}
      FROM users u
      JOIN roles r ON u.role_id = r.id
      JOIN role_permissions rp ON r.id = rp.role_id
      JOIN permissions p ON rp.permission_id = p.id
      WHERE u.id = ? AND p.resource = ?;
    `;

    db.query(query, [id, resource], (err, results) => {
      if (err) return res.status(500).send('Error checking permissions');
      if (!results.length || !results[0][action]) {
        return res.status(403).send('Access Denied');
      }
      next();
    });
  };
};

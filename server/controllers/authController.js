const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).send('Database error');
    if (!results.length) return res.status(404).send('User not found');

    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).send('Authentication error');
      if (!match) return res.status(401).send('Invalid credentials');

       // Generate JWT token
       const token = jwt.sign({ userId: user.id, username: user.username, roleId: user.role_id }, 'your_secret_key', { expiresIn: '1h' });

       // Get permissions associated with the user's role
       connection.execute(
         `SELECT permissions.name FROM permissions 
          INNER JOIN role_permissions ON permissions.id = role_permissions.permission_id 
          WHERE role_permissions.role_id = ?`,
         [user.role_id],
         (err, permissionResults) => {
           if (err) return res.status(500).json({ success: false, message: 'Error fetching permissions' });
 
           const permissions = permissionResults.reduce((acc, curr) => {
             acc[curr.name] = true;
             return acc;
           }, {});
 
           // Send response with token, role, and permissions
           res.json({
             success: true,
             token,
             role: user.role_id,
             permissions
           });
         });
    });
  });
};

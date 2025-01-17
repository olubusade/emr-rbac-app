const jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access Denied');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = decoded;
    next();
  });
};


const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'emr_rbac',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

// Middleware to verify JWT and attach user data
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user;
        next();
    });
};

// Check if role has permission for a specific action
const authorizePermission = (resource, action) => {
    return (req, res, next) => {
        const userRoleId = req.user.roleId; // Assume roleId is extracted from JWT

        // Check the database for the role's permissions
        db.query(
            `SELECT ${action} FROM permissions 
             JOIN role_permissions ON permissions.id = role_permissions.permission_id
             WHERE permissions.resource = ? AND role_permissions.role_id = ?`,
            [resource, userRoleId],
            (err, results) => {
                if (err) return res.status(500).send('Database error');
                if (!results.length || !results[0][action]) {
                    return res.status(403).send('Permission denied');
                }
                next();
            }
        );
    };
};



// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username = ?`;

    db.query(query, [username], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(401).json({ message: 'User not found' });

        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) return res.status(401).json({ message: 'Invalid Password' });

        const token = jwt.sign({ id: user.id, role: user.role_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});



// API routes
app.get('/patient-records', authenticateToken, authorizePermission('Patient Records', 'view'), (req, res) => {
    res.send('You can view patient records.');
});

app.post('/patient-records', authenticateToken, authorizePermission('Patient Records', 'write'), (req, res) => {
    res.send('You can write patient records.');
});

app.put('/patient-records/:id', authenticateToken, authorizePermission('Patient Records', 'update'), (req, res) => {
    res.send('You can update patient records.');
});

app.post('/prescriptions', authenticateToken, authorizePermission('Prescriptions', 'writeme'), (req, res) => {
    res.send('Creating a prescription');
});

app.put('/appointments/:id', authenticateToken, authorizePermission('Appointments', 'updateme'), (req, res) => {
    res.send('Updating appointment');
});
// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});






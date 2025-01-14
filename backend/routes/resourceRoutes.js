const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/permissionMiddleware');
const { getPatients, addPatient, updatePatient } = require('../controllers/resourceController');

router.get('/patients', authenticate, checkPermission('patients', 'readme'), getPatients);
router.post('/patients', authenticate, checkPermission('patients', 'writeme'), addPatient);
router.put('/patients/:id', authenticate, checkPermission('patients', 'updateme'), updatePatient);

module.exports = router;

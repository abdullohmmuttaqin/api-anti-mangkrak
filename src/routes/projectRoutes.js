const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { projectValidation } = require('../middleware/validator');
const { verifyToken } = require('../middleware/auth'); // Import satpam JWT

router.get('/stats', projectController.getProjectStats);
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

// PASANG GEMBOK VERIFYTOKEN DI SINI
router.delete('/:id', verifyToken, projectController.deleteProject);
router.post('/', verifyToken, projectValidation, projectController.createProject);
router.put('/:id', verifyToken, projectValidation, projectController.updateProject);

module.exports = router;
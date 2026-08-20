const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { projectValidation } = require('../middleware/validator');

// GET /api/projects/stats (HARUS DI ATAS /:id)
router.get('/stats', projectController.getProjectStats);

// Jalur GET dan DELETE
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.delete('/:id', projectController.deleteProject);

// Jalur POST dan PUT dengan Satpam Joi
router.post('/', projectValidation, projectController.createProject);
router.put('/:id', projectValidation, projectController.updateProject);

module.exports = router;
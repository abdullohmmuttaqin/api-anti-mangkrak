const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { projectValidation } = require('../middleware/validator');

// Jalur GET dan DELETE biarkan bebas masuk (tanpa validasi body)
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.delete('/:id', projectController.deleteProject);

// Pasang satpam projectValidation di POST dan PUT!
router.post('/', projectValidation, projectController.createProject);
router.put('/:id', projectValidation, projectController.updateProject);

module.exports = router;
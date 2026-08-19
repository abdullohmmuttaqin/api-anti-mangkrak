const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Mapping Jalur URL /api/projects
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
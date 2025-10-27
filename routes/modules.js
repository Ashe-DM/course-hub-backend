const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');

// Routes - just map URLs to controller functions
router.get('/', moduleController.getAllModules);
router.get('/:id', moduleController.getModuleById);
router.post('/', moduleController.createModule);
router.post('/:id/lessons', moduleController.addLesson);
router.post('/:id/projects', moduleController.addProject);
router.put('/:id', moduleController.updateModule);
router.delete('/:id', moduleController.deleteModule);

module.exports = router;
////mongodb+srv://admin:<Zik-0ve-@&$>@cluster0.nrlrzbf.mongodb.net/?appName=Cluster0
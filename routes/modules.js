const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');

router.get('/', moduleController.getAllModules);
router.get('/:id', moduleController.getModuleById);
router.post('/', moduleController.createModule);
router.post('/:id/units', moduleController.addUnit);
router.post('/:moduleId/units/:unitId/items', moduleController.addItem);
router.put('/:id', moduleController.updateModule);
router.delete('/:id', moduleController.deleteModule);
router.post('/:moduleId/units/:unitId/items', moduleController.addItem);

module.exports = router;
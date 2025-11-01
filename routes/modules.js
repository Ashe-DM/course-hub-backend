const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const { authenticate } = require('../middleware/auth');
const { requireRole } = require('../middleware/roleCheck');

// Public routes (anyone can view)
router.get('/', moduleController.getAllModules);
router.get('/:id', moduleController.getModuleById);

// Protected routes - CREATE (mentors and admins only)
router.post('/', 
  authenticate, 
  requireRole('mentor', 'admin'), 
  moduleController.createModule
);

router.post('/:id/units', 
  authenticate, 
  requireRole('mentor', 'admin'), 
  moduleController.addUnit
);

router.post('/:moduleId/units/:unitId/items', 
  authenticate, 
  requireRole('mentor', 'admin'), 
  moduleController.addItem
);

// Protected routes - UPDATE (mentors and admins only)
router.put('/:id', 
  authenticate, 
  requireRole('mentor', 'admin'), 
  moduleController.updateModule
);

router.put('/:moduleId/units/:unitId/items/:itemId', 
  authenticate, 
  requireRole('mentor', 'admin'), 
  moduleController.updateItem
);

// Protected routes - DELETE (admins only)
router.delete('/:id', 
  authenticate, 
  requireRole('admin'), 
  moduleController.deleteModule
);

router.delete('/:moduleId/units/:unitId/items/:itemId', 
  authenticate, 
  requireRole('admin'), 
  moduleController.deleteItem
);

module.exports = router;
const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const { authenticate } = require('../middleware/auth');
const { requireRole } = require('../middleware/roleCheck');

// ============================================
// PUBLIC ROUTES (No Authentication Required)
// ============================================
// Anyone can view modules
router.get('/', moduleController.getAllModules);
router.get('/:id', moduleController.getModuleById);

// ============================================
// PROTECTED ROUTES - CREATE
// (Mentors and Admins Only)
// ============================================

// Create new module
router.post('/', 
  authenticate, 
  requireRole('mentor', 'admin'), 
  moduleController.createModule
);

// Add unit to module
router.post('/:id/units', 
  authenticate, 
  requireRole('mentor', 'admin'), 
  moduleController.addUnit
);

// Add item to unit
router.post('/:moduleId/units/:unitId/items', 
  authenticate, 
  requireRole('mentor', 'admin'), 
  moduleController.addItem
);

// ============================================
// PROTECTED ROUTES - UPDATE
// (Mentors and Admins Only)
// ============================================

// Update module
router.put('/:id', 
  authenticate, 
  requireRole('mentor', 'admin'), 
  moduleController.updateModule
);

// Update item in unit
router.put('/:moduleId/units/:unitId/items/:itemId', 
  authenticate, 
  requireRole('mentor', 'admin'), 
  moduleController.updateItem
);

// ============================================
// PROTECTED ROUTES - DELETE
// (Admins Only)
// ============================================

// Delete module
router.delete('/:id', 
  authenticate, 
  requireRole('admin'), 
  moduleController.deleteModule
);

// Delete item from unit
router.delete('/:moduleId/units/:unitId/items/:itemId', 
  authenticate, 
  requireRole('admin'), 
  moduleController.deleteItem
);

module.exports = router;
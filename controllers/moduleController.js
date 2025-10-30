const Module = require('../models/Module');

exports.getAllModules = async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getModuleById = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createModule = async (req, res) => {
  const module = new Module({
    title: req.body.title || req.body.name, // Accept both
    name: req.body.name || req.body.title,   // For backward compatibility
    description: req.body.description || '',
    units: req.body.units || [],
    category: req.body.category,
    rating: req.body.rating,
    totalMinutes: req.body.totalMinutes
  });

  try {
    const newModule = await module.save();
    res.status(201).json(newModule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addUnit = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    module.units.push({
      title: req.body.title,
      description: req.body.description || '',
      items: [],
      order: req.body.order || module.units.length
    });

    const updatedModule = await module.save();
    res.json(updatedModule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addItem = async (req, res) => {
  try {
    const module = await Module.findById(req.params.moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    const unit = module.units.id(req.params.unitId);
    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' });
    }

    const newItem = {
      type: req.body.type,
      title: req.body.title,
      duration: req.body.duration || '',
      content: req.body.content || '',
      videoUrl: req.body.videoUrl || '',
      questions: req.body.questions || [],
      order: req.body.order || unit.items.length
    };

    unit.items.push(newItem);
    const updatedModule = await module.save();
    res.json(updatedModule);
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    if (req.body.title) {
      module.title = req.body.title;
      module.name = req.body.title; // Keep in sync
    }
    if (req.body.name && !req.body.title) {
      module.name = req.body.name;
      module.title = req.body.name; // Keep in sync
    }
    if (req.body.description !== undefined) module.description = req.body.description;
    if (req.body.units) module.units = req.body.units;
    if (req.body.category) module.category = req.body.category;
    if (req.body.rating) module.rating = req.body.rating;
    if (req.body.totalMinutes) module.totalMinutes = req.body.totalMinutes;

    const updatedModule = await module.save();
    res.json(updatedModule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    await module.deleteOne();
    res.json({ message: 'Module deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an item in a unit
exports.updateItem = async (req, res) => {
  try {
    const module = await Module.findById(req.params.moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    const unit = module.units.id(req.params.unitId);
    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' });
    }

    const item = unit.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Update item fields
    if (req.body.type) item.type = req.body.type;
    if (req.body.title) item.title = req.body.title;
    if (req.body.duration !== undefined) item.duration = req.body.duration;
    if (req.body.content !== undefined) item.content = req.body.content;
    if (req.body.videoUrl !== undefined) item.videoUrl = req.body.videoUrl;
    if (req.body.questions) item.questions = req.body.questions;
    if (req.body.order !== undefined) item.order = req.body.order;

    const updatedModule = await module.save();
    res.json(updatedModule);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete an item from a unit
exports.deleteItem = async (req, res) => {
  try {
    const module = await Module.findById(req.params.moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    const unit = module.units.id(req.params.unitId);
    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' });
    }

    const item = unit.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Remove the item
    item.deleteOne();
    
    const updatedModule = await module.save();
    res.json(updatedModule);
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(400).json({ message: error.message });
  }
};
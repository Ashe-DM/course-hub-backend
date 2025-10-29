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
    name: req.body.name,
    description: req.body.description || '',
    units: req.body.units || []
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

    if (req.body.name) module.name = req.body.name;
    if (req.body.description) module.description = req.body.description;
    if (req.body.units) module.units = req.body.units;

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
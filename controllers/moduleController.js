const Module = require('../models/Module');

// Get all modules
exports.getAllModules = async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single module
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

// Create new module
exports.createModule = async (req, res) => {
  const module = new Module({
    name: req.body.name,
    lessons: req.body.lessons || [],
    projects: req.body.projects || []
  });

  try {
    const newModule = await module.save();
    res.status(201).json(newModule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add lesson to module
exports.addLesson = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    
    module.lessons.push({
      title: req.body.title,
      description: req.body.description || ''
    });
    
    const updatedModule = await module.save();
    res.json(updatedModule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add project to module
exports.addProject = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    
    module.projects.push({
      title: req.body.title,
      description: req.body.description || ''
    });
    
    const updatedModule = await module.save();
    res.json(updatedModule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update module
exports.updateModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    if (req.body.name) module.name = req.body.name;
    if (req.body.lessons) module.lessons = req.body.lessons;
    if (req.body.projects) module.projects = req.body.projects;

    const updatedModule = await module.save();
    res.json(updatedModule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete module
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
const Project = require('../models/Project');

// 1. GET ALL PROJECTS (Ambil Semua Data dari MongoDB)
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: 'Berhasil mengambil daftar proyek dari MongoDB Cloud',
      total: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data proyek!',
      error: error.message
    });
  }
};

// 2. GET PROJECT BY ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Proyek dengan ID ${req.params.id} tidak ditemukan, Bos!`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Berhasil mengambil detail proyek',
      data: project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Format ID tidak valid atau proyek tidak ditemukan!',
      error: error.message
    });
  }
};

// 3. CREATE PROJECT (POST)
exports.createProject = async (req, res) => {
  try {
    const { title, description, category, status, deadline } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: 'Judul (title) dan Kategori (category) wajib diisi, Bos!'
      });
    }

    const newProject = await Project.create({
      title,
      description,
      category,
      status,
      deadline
    });

    res.status(201).json({
      success: true,
      message: 'Proyek baru berhasil disimpan permanen ke MongoDB Cloud!',
      data: newProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal menambahkan proyek baru!',
      error: error.message
    });
  }
};

// 4. UPDATE PROJECT (PUT)
exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: `Gagal update! Proyek dengan ID ${req.params.id} tidak ditemukan, Bos!`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Proyek berhasil diperbarui di MongoDB Cloud!',
      data: updatedProject
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Gagal memperbarui proyek!',
      error: error.message
    });
  }
};

// 5. DELETE PROJECT
exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: `Gagal menghapus! Proyek dengan ID ${req.params.id} tidak ditemukan, Bos!`
      });
    }

    res.status(200).json({
      success: true,
      message: `Proyek '${deletedProject.title}' berhasil dihapus dari MongoDB Cloud!`,
      data: deletedProject
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Gagal menghapus proyek!',
      error: error.message
    });
  }
};
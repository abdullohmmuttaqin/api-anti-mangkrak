const Project = require('../models/Project');

// 1. GET ALL PROJECTS (Search, Filter, & Pagination)
exports.getAllProjects = async (req, res) => {
  try {
    const { search, category, status, page = 1, limit = 10 } = req.query;

    // Buat Objek Query Dinamis
    let query = {};

    // Fitur Search (Berdasarkan Title, Case-Insensitive)
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Fitur Filter Category
    if (category) {
      query.category = category;
    }

    // Fitur Filter Status
    if (status) {
      query.status = status;
    }

    // Konversi Page & Limit ke Angka
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Eksekusi Query ke MongoDB
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    // Hitung Total Data Sesuai Query
    const totalItems = await Project.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limitNum);

    res.status(200).json({
      success: true,
      message: 'Berhasil mengambil daftar proyek dari MongoDB Cloud',
      pagination: {
        currentPage: pageNum,
        totalPages: totalPages,
        totalItems: totalItems,
        limitPerPage: limitNum
      },
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

// GET PROJECT STATISTICS
exports.getProjectStats = async (req, res, next) => {
  try {
    // Menghitung total keseluruhan proyek
    const totalProjects = await Project.countDocuments();

    // Menggunakan Aggregation untuk mengelompokkan dan menghitung berdasarkan status
    const stats = await Project.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Merapikan bentuk data agar mudah dibaca Frontend
    const statusCount = {
      'Mangkrak': 0,
      'Dalam Pengerjaan': 0,
      'Selesai': 0
    };

    stats.forEach(item => {
      if (statusCount[item._id] !== undefined) {
        statusCount[item._id] = item.count;
      }
    });

    res.status(200).json({
      success: true,
      message: 'Berhasil mengambil statistik proyek, Bos!',
      data: {
        total: totalProjects,
        details: statusCount
      }
    });
  } catch (error) {
    next(error);
  }
};

// 2. GET PROJECT BY ID
exports.getProjectById = async (req, res, next) => {
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
    next(error);
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
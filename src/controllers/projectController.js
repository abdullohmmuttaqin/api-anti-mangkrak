// Database Sementara (Data Dummy)
let projects = [
  {
    id: 1,
    title: "Showroom App",
    description: "Aplikasi showroom mobil berbasis React Native",
    category: "Mobile",
    status: "Dalam Pengerjaan",
    deadline: "2026-08-15"
  },
  {
    id: 2,
    title: "Website Portofolio Astro",
    description: "Website portofolio pribadi menggunakan Astro dan Tailwind",
    category: "Web",
    status: "Mangkrak",
    deadline: "2026-09-01"
  }
];

// 1. GET ALL PROJECTS
exports.getAllProjects = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Berhasil mengambil daftar proyek',
    total: projects.length,
    data: projects
  });
};

// 2. GET PROJECT BY ID
exports.getProjectById = (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: `Proyek dengan ID ${projectId} tidak ditemukan, Bos!`
    });
  }

  res.status(200).json({
    success: true,
    message: 'Berhasil mengambil detail proyek',
    data: project
  });
};

// 3. CREATE PROJECT (POST)
exports.createProject = (req, res) => {
  const { title, description, category, status, deadline } = req.body;

  if (!title || !category) {
    return res.status(400).json({
      success: false,
      message: 'Judul (title) dan Kategori (category) wajib diisi, Bos!'
    });
  }

  const newProject = {
    id: projects.length > 0 ? projects[projects.length - 1].id + 1 : 1,
    title,
    description: description || '',
    category,
    status: status || 'Mangkrak',
    deadline: deadline || ''
  };

  projects.push(newProject);

  res.status(201).json({
    success: true,
    message: 'Proyek baru berhasil ditambahkan agar tidak mangkrak!',
    data: newProject
  });
};

// 4. UPDATE PROJECT (PUT)
exports.updateProject = (req, res) => {
  const projectId = parseInt(req.params.id);
  const projectIndex = projects.findIndex(p => p.id === projectId);

  if (projectIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Gagal update! Proyek dengan ID ${projectId} tidak ditemukan, Bos!`
    });
  }

  const { title, description, category, status, deadline } = req.body;

  projects[projectIndex] = {
    ...projects[projectIndex],
    title: title || projects[projectIndex].title,
    description: description !== undefined ? description : projects[projectIndex].description,
    category: category || projects[projectIndex].category,
    status: status || projects[projectIndex].status,
    deadline: deadline !== undefined ? deadline : projects[projectIndex].deadline
  };

  res.status(200).json({
    success: true,
    message: `Proyek dengan ID ${projectId} berhasil diperbarui!`,
    data: projects[projectIndex]
  });
};

// 5. DELETE PROJECT
exports.deleteProject = (req, res) => {
  const projectId = parseInt(req.params.id);
  const projectIndex = projects.findIndex(p => p.id === projectId);

  if (projectIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Gagal menghapus! Proyek dengan ID ${projectId} tidak ditemukan, Bos!`
    });
  }

  const deletedProject = projects[projectIndex];
  projects.splice(projectIndex, 1);

  res.status(200).json({
    success: true,
    message: `Proyek '${deletedProject.title}' (ID: ${projectId}) berhasil dihapus dari daftar!`,
    data: deletedProject
  });
};
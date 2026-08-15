// 1. Mengimpor pustaka express
const express = require('express');

// 2. Inisialisasi aplikasi express
const app = express();

// 3. Menentukan nomor PORT
const PORT = 3000;

// 4. Middleware bawaan agar server paham data berformat JSON
app.use(express.json());

// ==========================================
// TAHAP 6: DATA DUMMY (Database Sementara)
// Kita pakai 'let' karena daftar proyek ini akan bertambah/berkurang
// ==========================================
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

// 5. Route Utama (Pengecekan Server)
app.get('/', (req, res) => {
  res.json({
    message: 'API Anti-Mangkrak Siap Digunakan, Bos!',
    status: 'Success'
  });
});

// ==========================================
// TAHAP 7: ENDPOINT GET ALL PROJECTS
// URL: http://localhost:3000/api/projects
// ==========================================
app.get('/api/projects', (req, res) => {
  // res.status(200) artinya memberi respon status 'OK'
  res.status(200).json({
    success: true,
    message: 'Berhasil mengambil daftar proyek',
    total: projects.length, // Menghitung otomatis berapa jumlah proyek di array
    data: projects          // Mengirimkan isi array proyek kita
  });
});

// ==========================================
// TAHAP 8: ENDPOINT GET PROJECT BY ID
// URL: http://localhost:3000/api/projects/:id
// ==========================================
app.get('/api/projects/:id', (req, res) => {
  // 1. Mengambil ID dari parameter URL dan diubah ke tipe angka (number)
  const projectId = parseInt(req.params.id);

  // 2. Mencari proyek dalam array berdasarkan ID
  const project = projects.find(p => p.id === projectId);

  // 3. Jika proyek TIDAK ditemukan, kirim respon Error 404
  if (!project) {
    return res.status(404).json({
      success: false,
      message: `Proyek dengan ID ${projectId} tidak ditemukan, Bos!`
    });
  }

  // 4. Jika proyek ditemukan, kirim respon Sukses 200 beserta datanya
  res.status(200).json({
    success: true,
    message: 'Berhasil mengambil detail proyek',
    data: project
  });
});

// ==========================================
// TAHAP 9: ENDPOINT POST CREATE PROJECT
// URL: http://localhost:3000/api/projects
// ==========================================
app.post('/api/projects', (req, res) => {
  // 1. Mengambil data yang dikirim oleh client melalui req.body
  const { title, description, category, status, deadline } = req.body;

  // 2. Validasi sederhana: pastikan title dan category tidak kosong
  if (!title || !category) {
    return res.status(400).json({
      success: false,
      message: 'Judul (title) dan Kategori (category) wajib diisi, Bos!'
    });
  }

  // 3. Membuat objek proyek baru dengan ID yang otomatis bertambah (auto-increment)
  const newProject = {
    id: projects.length > 0 ? projects[projects.length - 1].id + 1 : 1,
    title,
    description: description || '',
    category,
    status: status || 'Mangkrak', // Default status jika tidak diisi
    deadline: deadline || ''
  };

  // 4. Memasukkan proyek baru ke dalam array projects
  projects.push(newProject);

  // 5. Kirim respon Sukses HTTP 201 (Created) beserta data proyek baru
  res.status(201).json({
    success: true,
    message: 'Proyek baru berhasil ditambahkan agar tidak mangkrak!',
    data: newProject
  });
});

// ==========================================
// TAHAP 10: ENDPOINT PUT UPDATE PROJECT
// URL: http://localhost:3000/api/projects/:id
// ==========================================
app.put('/api/projects/:id', (req, res) => {
  // 1. Ambil ID dari parameter URL dan konversi ke angka
  const projectId = parseInt(req.params.id);

  // 2. Cari indeks posisi proyek di dalam array
  const projectIndex = projects.findIndex(p => p.id === projectId);

  // 3. Jika proyek tidak ditemukan, kirim respon Error 404
  if (projectIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Gagal update! Proyek dengan ID ${projectId} tidak ditemukan, Bos!`
    });
  }

  // 4. Ambil data perbaruan dari req.body
  const { title, description, category, status, deadline } = req.body;

  // 5. Perbarui data proyek (gunakan nilai lama jika field tertentu tidak diisi/diubah)
  projects[projectIndex] = {
    ...projects[projectIndex], // Mempertahankan data lama
    title: title || projects[projectIndex].title,
    description: description !== undefined ? description : projects[projectIndex].description,
    category: category || projects[projectIndex].category,
    status: status || projects[projectIndex].status,
    deadline: deadline !== undefined ? deadline : projects[projectIndex].deadline
  };

  // 6. Kirim respon Sukses 200 beserta data proyek yang sudah diperbarui
  res.status(200).json({
    success: true,
    message: `Proyek dengan ID ${projectId} berhasil diperbarui!`,
    data: projects[projectIndex]
  });
});

// 6. Jalankan Server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:3000`);
});
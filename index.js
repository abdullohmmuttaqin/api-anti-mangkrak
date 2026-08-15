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

// 6. Jalankan Server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:3000`);
});
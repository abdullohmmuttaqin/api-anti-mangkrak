// 1. Mengimpor pustaka express yang sudah kita unduh di PowerShell
const express = require("express");

// 2. Membikin instansiasi/aplikasi express
const app = express();

// 3. Menentukan nomor PORT tempat server berjalan di laptop kita
const PORT = 3000;

// 4. Middleware bawaan express agar server bisa menerima & membaca data format JSON
app.use(express.json());

// 5. Membuat Route dasar (Uji Coba Endpoint GET pada URL utama '/')
app.get("/", (req, res) => {
  res.json({
    message: "API Anti-Mangkrak Siap Digunakan, Bos!",
    status: "Success",
  });
});

// 6. Jalankan server pada PORT 3000
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

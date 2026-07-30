// Baris 1: Kita panggil library 'express' yang sudah kita download kemarin di PowerShell.
// Ibaratnya, kita pinjam mesin utama untuk membuat server.
const express = require("express");

// Baris 2: Kita hidupkan mesin express-nya dan disimpan dalam variabel bernama 'app'.
// Mulai sekarang, variabel 'app' inilah yang memegang kendali server kita.
const app = express();

// Baris 3: Kita tentukan "nomor pintu rumah" (PORT) di komputer kita.
// Kita pakai angka 3000. Jadi nanti server kita bisa diakses di alamat localhost:3000.
const PORT = 3000;

// Baris 4: Ini namanya Middleware. Fungsinya seperti satpam pembaca surat.
// Kode ini memberi tahu server agar bisa membaca data yang dikirim dengan format JSON.
app.use(express.json());

// Baris 5: Kita buat rute/jalur (Route) paling dasar.
// Jika ada orang yang mengakses URL utama server kita ('/'),
// server akan langsung membalas dengan format JSON di bawah ini.
app.get("/", (req, res) => {
  res.json({
    message: "API Anti-Mangkrak Siap Digunakan, Bos!",
    status: "Success",
  });
});

// Baris 6: Kita perintahkan server untuk mulai standby dan mendengarkan (listen)
// di PORT 3000. Begitu server menyala, dia akan memunculkan teks di terminal.
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

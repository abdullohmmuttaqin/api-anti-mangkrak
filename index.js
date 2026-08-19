const express = require('express');
const app = express();
const PORT = 3000;

// Middleware JSON Parser
app.use(express.json());

// Import Routes
const projectRoutes = require('./src/routes/projectRoutes');

// Route Utama (Health Check)
app.get('/', (req, res) => {
  res.json({
    message: 'API Anti-Mangkrak Siap Digunakan, Bos!',
    status: 'Success'
  });
});

// Gunakan Router Proyek untuk Prefix /api/projects
app.use('/api/projects', projectRoutes);

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:3000`);
});
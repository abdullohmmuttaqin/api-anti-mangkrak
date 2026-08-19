require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Hubungkan Server ke MongoDB Cloud
connectDB();

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

// Gunakan Router Proyek
app.use('/api/projects', projectRoutes);

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
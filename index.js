require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect Database
connectDB();

// Middleware Body Parser
app.use(express.json());

// Routes
const projectRoutes = require('./src/routes/projectRoutes');

app.get('/', (req, res) => {
  res.json({ message: 'API Anti-Mangkrak Siap Digunakan, Bos!', status: 'Success' });
});

app.use('/api/projects', projectRoutes);

const authController = require('./src/controllers/authController');
app.post('/api/auth/login', authController.login);

// Global Error Handler (Harus paling bawah setelah routes)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
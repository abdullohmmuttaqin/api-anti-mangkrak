const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  
  if (!bearerHeader) {
    return res.status(403).json({ success: false, message: 'Akses ditolak! Token tidak ditemukan, Bos!' });
  }

  const token = bearerHeader.split(' ')[1]; // Mengambil token dari format "Bearer <token>"
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan data user ke request
    next(); // Kunci cocok, silakan masuk!
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token tidak valid atau sudah kadaluarsa!' });
  }
};

module.exports = { verifyToken };
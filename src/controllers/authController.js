const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Cek kecocokan username dan password
  if (username === 'admin' && password === 'mangkrak123') {
    // Buat token yang berlaku 1 jam
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ success: true, message: 'Login berhasil, Bos!', token });
  }

  res.status(401).json({ success: false, message: 'Username atau Password salah, Bos!' });
};
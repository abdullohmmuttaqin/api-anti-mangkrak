const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Cloud Terhubung: ${conn.connection.host}, Bos! 🔥`);
  } catch (error) {
    console.error(`Error Koneksi Database: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
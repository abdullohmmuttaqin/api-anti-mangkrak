const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Judul proyek wajib diisi!'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      required: [true, 'Kategori proyek wajib diisi!'],
      enum: ['Web', 'Mobile', 'Desktop', 'IoT', 'Other'],
      default: 'Web'
    },
    status: {
      type: String,
      enum: ['Mangkrak', 'Dalam Pengerjaan', 'Selesai'],
      default: 'Mangkrak'
    },
    deadline: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true // Otomatis menambahkan field createdAt & updatedAt
  }
);

module.exports = mongoose.model('Project', projectSchema);
const Joi = require('joi');

const projectValidation = (req, res, next) => {
  // Bikin aturan ketat untuk tiap kolom
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      'string.empty': 'Judul proyek nggak boleh kosong, Bos!',
      'string.min': 'Judul proyek minimal 3 karakter!',
      'any.required': 'Judul proyek wajib diisi!'
    }),
    description: Joi.string().allow('', null),
    category: Joi.string().valid('Web', 'Mobile', 'Desktop', 'Lainnya').required().messages({
      'any.only': 'Kategori cuma boleh: Web, Mobile, Desktop, atau Lainnya!',
      'any.required': 'Kategori wajib diisi!'
    }),
    status: Joi.string().valid('Mangkrak', 'Dalam Pengerjaan', 'Selesai').default('Mangkrak').messages({
      'any.only': 'Status cuma boleh: Mangkrak, Dalam Pengerjaan, atau Selesai!'
    }),
    deadline: Joi.date().allow('', null).messages({
      'date.base': 'Format deadline harus berupa tanggal yang valid!'
    })
  });

  // Cek apakah data dari user (req.body) melanggar aturan
  const { error } = schema.validate(req.body, { abortEarly: false });

  // Kalau ada yang melanggar, tendang dengan status 400 Bad Request
  if (error) {
    const errorMessage = error.details.map(detail => detail.message);
    return res.status(400).json({ success: false, message: errorMessage });
  }

  // Kalau aman, silakan masuk ke Controller
  next();
};

module.exports = { projectValidation };
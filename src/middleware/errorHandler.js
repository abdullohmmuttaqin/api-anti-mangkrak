const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // 1. Mongoose Bad ObjectId (Format ID Ngawur)
  if (err.name === 'CastError') {
    const message = `Format ID '${err.value}' tidak valid, Bos!`;
    return res.status(400).json({ success: false, message });
  }

  // 2. Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ success: false, message });
  }

  // 3. Default Server Error
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Terjadi kesalahan pada Server, Bos!'
  });
};

module.exports = errorHandler;
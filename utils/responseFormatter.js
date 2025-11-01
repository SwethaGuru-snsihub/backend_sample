// middleware/responseFormatter.js
module.exports = (req, res, next) => {
  res.success = (data = {}, message = 'Success', statusCode) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };

  res.successWithoutData = (message = 'Success', statusCode) => {
    res.status(statusCode).json({
      success: true,
      message,
    });
  };

  res.error = (message = 'Something went wrong', statusCode = 500) => {
    res.status(statusCode).json({
      success: false,
      message,
    });
  };

  next();
};

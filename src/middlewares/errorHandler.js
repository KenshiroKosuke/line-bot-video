module.exports = ((err, req, res, next) => {
  console.log(err);
  return res
    .status(err.statusCode || 500)
    .send({
      message: err.message,
      code: err.code || "",
      errorAt: err.errorAt || "",
    })
    .end();
});
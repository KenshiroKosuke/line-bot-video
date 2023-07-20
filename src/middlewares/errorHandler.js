const { AxiosError } = require("axios");

module.exports = ((err, req, res, next) => {
  // console.log(err);
  if(err instanceof AxiosError){
    if (err.response) {
      console.log(err.response.statusText,err.response.status);
      console.log(err.response.data);
      console.log(err.response.headers);
      err.message = err.response.data
    } else if (err.request) {
      console.log(err.request);
    } else {
      console.log('Error', err.message);
    }
  }
  return res
    .status(err.statusCode || 500)
    .send({
      message: err.message,
      code: err.code || "",
      errorAt: err.errorAt || "",
    })
    .end();
});
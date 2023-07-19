class BadRequestError extends Error {
  constructor(message, errorAt) {
    super();
    this.statusCode = 400;
    this.errorAt = errorAt;
    this.message = message;
    this.code = "BAD_REQUEST";
  }
}
module.exports = {
  BadRequestError
}
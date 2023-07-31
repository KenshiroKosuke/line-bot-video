class BadRequestError extends Error {
  constructor(message, errorAt) {
    super();
    this.statusCode = 400;
    this.errorAt = errorAt;
    this.message = message;
    this.code = "BAD_REQUEST";
  }
}

class InternalServerError extends Error {
  constructor(message, errorAt) {
    super();
    this.statusCode = 500;
    this.errorAt = errorAt;
    this.message = message;
    this.code = "INTERNAL_SERVER_ERROR";
  }
}

class BadGatewayError extends Error {
  constructor(message, errorAt) {
    super();
    this.statusCode = 502;
    this.errorAt = errorAt;
    this.message = message;
    this.code = "BAD_GATEWAY";
  }
}

module.exports = {
  BadRequestError,
  InternalServerError,
  BadGatewayError
}
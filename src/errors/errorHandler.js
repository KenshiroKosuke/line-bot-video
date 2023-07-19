class ErrorHandler extends Error {
  constructor(statusCode, message, code, type, errorAt) {
    super();
    this.statusCode = statusCode;
    this.errorAt = errorAt;
    this.message = message;
    this.code = code;
    this.type = type;
  }
}
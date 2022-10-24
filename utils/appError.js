class AppError extends Error {
  constructor(message, statusCode){
  super(message);/* Calling the constructor of the parent class. */

  this.statusCode = statusCode;
  this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  this.isOperational = true;

  /* A method that is used to capture the stack trace of the error. */
  Error.captureStackTrace(this, this.constructor);
  } 
}

module.exports = AppError;
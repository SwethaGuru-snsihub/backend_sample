/**
 * Errors Index
 * Central export point for all error classes
 */

const { AppError } = require('./AppError');
const customErrors = require('./customErrors');

module.exports = {
  AppError,
  ...customErrors
};


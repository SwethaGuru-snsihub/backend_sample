/**
 * Constants Index
 * Central export point for all constants
 */

const statusCodes = require('./statusCodes');
const messages = require('./messages');

module.exports = {
  ...statusCodes,
  messages
};


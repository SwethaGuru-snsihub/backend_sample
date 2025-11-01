/**
 * Config Index
 * Central export point for all configuration
 */

const appConfig = require('./app');
const connectDB = require('./database');

module.exports = {
  app: appConfig,
  connectDB
};


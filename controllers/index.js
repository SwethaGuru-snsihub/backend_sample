/**
 * Controllers Index
 * Central export point for all controllers
 */

const todoController = require("./todoController");

module.exports = {
  ...todoController
};


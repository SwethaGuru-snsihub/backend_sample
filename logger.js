/**
 * Logger utility
 * Simple logging wrapper that can be extended with winston or pino for production
 */

const logLevels = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

const currentLogLevel = process.env.LOG_LEVEL 
  ? logLevels[process.env.LOG_LEVEL.toUpperCase()] || logLevels.INFO
  : logLevels.INFO;

const formatMessage = (level, message, data = null) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...(data && { data })
  };
  return JSON.stringify(logEntry);
};

const logger = {
  error: (message, error = null) => {
    if (currentLogLevel >= logLevels.ERROR) {
      console.error(formatMessage('ERROR', message, error));
    }
  },

  warn: (message, data = null) => {
    if (currentLogLevel >= logLevels.WARN) {
      console.warn(formatMessage('WARN', message, data));
    }
  },

  info: (message, data = null) => {
    if (currentLogLevel >= logLevels.INFO) {
      console.info(formatMessage('INFO', message, data));
    }
  },

  debug: (message, data = null) => {
    if (currentLogLevel >= logLevels.DEBUG) {
      console.debug(formatMessage('DEBUG', message, data));
    }
  }
};

module.exports = logger;


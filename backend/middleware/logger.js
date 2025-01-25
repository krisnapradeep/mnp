const morgan = require('morgan');

// Middleware for logging requests
const logger = morgan('combined');

module.exports = logger;

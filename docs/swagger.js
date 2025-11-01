// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sample Backend',
      version: '1.0.0',
      description: 'API documentation for NAAC Backend',
    },
    tags: [
      {
        name: 'Authentication',
        description: 'Endpoints for user login, registration, and reset and forgot password.',
      },
      {
        name: 'Institution',
        description: 'Endpoints for create, fetch all institutions and fetch institution by Id.',
      },
      {
        name: 'Criterion',
        description: 'Endpoints for create, fetch all criteria and fetch criterion by Id.',
      },
      {
        name: 'Autonomous Metric',
        description: 'Endpoints for creating Autonomous metric, and fetch metrics by subtask Id.',
      },
      {
        name: 'University Metric',
        description: 'Endpoints for creating Univerity metric, and fetch metrics by subtask Id.',
      },
      {
        name: 'Metric Draft',
        description: 'Endpoints for creating draft, edit draft and fetch draft by Id.',
      },
      {
        name: 'Notifications',
        description: 'Endpoints for creating notification and fetch notification by user Id',
      },
      {
        name: 'Users',
        description: 'Endpoints for editing user, get user and delete user',
      },
    ],
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
  },
  apis: ['./routes/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

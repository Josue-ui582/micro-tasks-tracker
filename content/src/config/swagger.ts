import swaggerJSDoc = require("swagger-jsdoc");

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express TypeScript API with Swagger',
      version: '1.0.0',
      description: 'API documentation using Swagger JSDoc'
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Micro Tasks Tracker Api Documentation'
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/models/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports =  swaggerSpec;
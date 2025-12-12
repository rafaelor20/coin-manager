import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Coin Manager API',
      version: '1.0.0',
      description: 'API documentation for the Coin Manager application',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Transaction: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            userId: {
              type: 'integer',
            },
            entity: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            amount: {
              type: 'number',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Path to the files containing OpenAPI definitions
  apis: ['./src/routers/*.ts', './src/routers/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);

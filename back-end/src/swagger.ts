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

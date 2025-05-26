import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IRD API with Swagger',
      version: '1.0.0',
      description: 'This is a simple CRUD API application made with Express and documented with Swagger',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`, // Adjusted to remove /api, as routes already include it
      },
    ],
  },
  // Path to the API docs
  // Using relative path from project root
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Scan these files for JSDoc comments
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

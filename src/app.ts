import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple root route for testing
app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});

// API Routes
import irdRouter from './routes/irdRoutes';
app.use(irdRouter);

// Swagger UI
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerConfig';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Handling Middleware - Add this as the last middleware
import { basicErrorHandler } from './middlewares/errorHandler';
app.use(basicErrorHandler);

export default app;

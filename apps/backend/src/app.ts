// dependencies
import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

// load environment variables BEFORE internal imports
dotenv.config();

// configs
import corsOptions from '../config/cors';
import setupSwagger from '../config/swagger';
import errorHandler from './api/v1/middleware/errorHandler';

// routes
import itemListRouter from './api/v1/routes/itemListRoutes';

const app: Express = express();

setupSwagger(app);
app.use(morgan('combined'));
app.use(express.json());

app.use(cors(corsOptions));

/**
 * @openapi
 * /api/v1/health:
 *  get:
 *   summary: Retrieve the server health status
 *   tags: [Health]
 *   responses:
 *    200:
 *     description: Server health status
 */
app.get('/api/v1/health', (_req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

app.use('/api/v1/romdirectory', itemListRouter);

app.use(errorHandler); // MUST BE AT THE END

export default app;

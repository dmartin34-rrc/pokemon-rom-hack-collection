// dependencies
import express, { Express } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

// load environment variables BEFORE internal imports
dotenv.config();

// configs
import setupSwagger from '../config/swagger';
import errorHandler from './api/v1/middleware/errorHandler';

// routes

const app: Express = express();

setupSwagger(app);
app.use(morgan('combined'));
app.use(express.json());

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

app.use(errorHandler); // MUST BE AT THE END

export default app;

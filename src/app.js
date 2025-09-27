import express from 'express';
import cors from 'cors';
import { logMiddleware } from './utils/logger.utils.js';
import appRoutes from './routes/index.js';
import { errorHandler, notFoundRoute } from './middlewares/error.middleware.js';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(logMiddleware);

// routes
app.use('/api/v1', appRoutes);

app.use(notFoundRoute);
// error handler
app.use(errorHandler);


export default app;

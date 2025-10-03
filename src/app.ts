import express, { Request, Response} from 'express';
import cors from 'cors';
import { logMiddleware } from './utils/logger.utils';
import appRoutes from './routes/index';
import { errorHandler, notFoundRoute } from './middlewares/error.middleware';
import { setupSwagger } from './utils/swagger.utils';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(logMiddleware);
setupSwagger(app);

app.get('/',(req: Request, res: Response)=>{
    res.json({
        status: "success",
        message: "server running",
        docs: "docs available on /api-docs",
        time: new Date()
    })
})

// routes
app.use('/api/v1', appRoutes);

app.use(notFoundRoute);
// error handler
app.use(errorHandler);


export default app;

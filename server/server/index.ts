import cors, { CorsOptions } from 'cors';
import express from 'express';
import { passport } from '../services/passport';
import { loggerMiddleWare } from '../logger/middleware';
import { initializeRoutes } from './routes';
import bodyParser from 'body-parser';
import responseTime from 'response-time';
import logger from '../logger';
import path from 'path';

const corsOptions: CorsOptions = {
    origin: true,
    allowedHeaders: ['Authorization', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
};

const app = express();

app.use(
    responseTime((req: express.Request, res: express.Response, time: number) => {
        logger.info(`${req.method} ${req.url} took ${time.toFixed(1)}ms to handle.`);
    }),
);

app.use(bodyParser.json());

app.use(passport.initialize());

app.use(cors(corsOptions));

// Setup request logging
app.use(loggerMiddleWare);

// Setup route handlers
initializeRoutes(app);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../public')));

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });
}

export default app;

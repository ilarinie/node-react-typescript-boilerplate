import { NextFunction, Request, Response } from 'express';
import logger from '../logger';

const rootRoute = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(`Backend server is running A-OK! ENV: ${process.env.NODE_ENV}`);
};

const postTest = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send('OK');
};
export default {
    rootRoute,
    postTest,
};

import { Response, Request, NextFunction } from 'express';
import logger from '../logger';

export const requireParams = (params: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const missingParams: string[] = [];
        params.forEach(param => {
            if (!Object.keys(req.body).includes(param)) {
                missingParams.push(param);
            }
        });
        if (missingParams.length === 0) {
            next();
        } else {
            logger.error(`Missing parameters: ${missingParams.toString()}`);
            res.status(406).send(`Missing parameters: ${missingParams.toString()}`);
        }
    };
};

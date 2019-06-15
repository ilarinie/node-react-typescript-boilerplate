import { NextFunction, Request, Response } from 'express';
import requestIp from 'request-ip';
import logger from '../logger';

export const loggerMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    logger.log('info', `${req.method} ${req.path} from ${requestIp.getClientIp(req)}`);
    // tslint:disable-next-line
    req.body && Object.entries(req.body).length !== 0 && logger.debug(`Request body:\n/////   BODY:   /////\n\n${JSON.stringify(req.body, null, 2)}\n\n/////////////////////`);
    next();
};

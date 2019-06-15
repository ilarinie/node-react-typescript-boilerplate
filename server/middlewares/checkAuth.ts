import { NextFunction, Request, Response } from 'express-serve-static-core';
import passport from 'passport';
import logger from '../logger';
import requestIp from 'request-ip';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (error, user) => {
        if (error) {
            logger.error(`Authentication (JWT) failure from ${requestIp.getClientIp(req)} ${error}`);
            res.status(401).send('Unauthorized');
        } else {
            req.user = user;
            next(null);
        }
    })(req, res, next);
};

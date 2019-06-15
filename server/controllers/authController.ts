import { NextFunction, Request, Response } from 'express';
import logger from '../logger';
import { passport, generateToken } from '../services/passport';
import { IVerifyOptions } from 'passport-local';
import { getConnection } from 'typeorm';
import { User } from '../db/entities/User';

const login = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: Error, user: User, info: IVerifyOptions) => {
        if (!user) {
            if (info) {
                logger.error(`Error logging in: ${info.message}`);
            } else {
                logger.error(`Error logging in: ${err.message}`);
            }
            res.status(401).send('Username or password wrong.');
        } else {
            logger.info(`Login succesful.`);
            res.setHeader('Authorization', 'Bearer ' + generateToken(user));
            res.status(200).send({ token: generateToken(user), user });
        }
    })(req, res, next);
};

const register = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
        const userRepository = await getConnection().getRepository(User);
        const user = await userRepository.create({ username, password });
        await userRepository.save(user);
        res.status(200).send(user);
    } catch (error) {
        logger.error(`Error registering a new user: ${error}`);
        logger.debug(error.stack);
    }
};

const loggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        res.status(200).send(req.user);
    } else {
        res.status(401).send('Not logged in');
    }
};

export default {
    login,
    register,
    loggedIn,
};

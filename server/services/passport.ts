import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import logger from '../logger';
import { User } from '../db/entities/User';
import { getConnection } from 'typeorm';
import * as env from 'env-var';
import jsonWebToken from 'jsonwebtoken';

passport.serializeUser<User, number>((user: User, done) => {
    return done(null, user.id);
});

passport.deserializeUser<User, number>(async (id, done) => {
    const userRepository = await getConnection().getRepository(User);
    try {
        const user = await userRepository.findOneOrFail(id);
        return done(null, user);
    } catch (error) {
        return done(error);
    }
});

export const generateToken = (user: User) => {
    return jsonWebToken.sign(
        { user_id: user.id },
        env
            .get('JWT_SECRET')
            .required()
            .asString(),
        { expiresIn: '1h' },
    );
};

passport.use(
    new LocalStrategy(async (username, password, done) => {
        logger.debug(`Login attempt: '${username}'`);
        const userRepository = await getConnection().getRepository(User);
        try {
            const user = await userRepository.findOneOrFail({ username });
            if (await user.isPassword(password)) {
                done(null, user);
            } else {
                logger.error(`Login attempt with incorrect password: ${username}`);
                done('Incorrect password');
            }
        } catch (error) {
            done(error);
        }
    }),
);

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env
        .get('JWT_SECRET')
        .required()
        .asString(),
};

passport.use(
    new JWTStrategy(jwtOpts, async (jwtPayload, done) => {
        const userRepository = await getConnection().getRepository(User);
        try {
            const user = await userRepository.findOneOrFail({ id: jwtPayload.user_id });
            logger.info(`Authorized user (JWT): ${user.username}`);
            done(null, user);
        } catch (err) {
            logger.debug(err);
            done(err, null);
        }
    }),
);

export { passport };

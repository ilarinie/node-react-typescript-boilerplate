import dotenv from 'dotenv';
dotenv.config();
import logger from './logger';
import app from './server';
import env from 'env-var';
import { initializeDB } from './db';
export * from './db/entities';

const PORT = env.get('PORT').asString() || 3001;

const init = async () => {
    try {
        await initializeDB();
        app.listen(PORT, () => {
            logger.info(`Server started, listening on port ${PORT}`);
        });
    } catch (error) {
        logger.error(`Error creating database connection: ${error}`);
        logger.debug(`${error.stack}`);
    }
};

init();

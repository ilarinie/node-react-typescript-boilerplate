import 'reflect-metadata';
import { createConnection } from 'typeorm';
import env from 'env-var';
import logger from '../logger';

const dbConfig = () => {
    if (process.env.NODE_ENV === 'test') {
        return {
            username: env
                .get('TEST_DB_USERNAME')
                .required()
                .asString(),
            password: env
                .get('TEST_DB_PASSWORD')
                .required()
                .asString(),
            database: env
                .get('TEST_DB_NAME')
                .required()
                .asString(),
        };
    } else if (process.env.NODE_ENV === 'production') {
        return {
            username: env
                .get('PROD_DB_USERNAME')
                .required()
                .asString(),
            password: env
                .get('PROD_DB_PASSWORD')
                .required()
                .asString(),
            database: env
                .get('PROD_DB_NAME')
                .required()
                .asString(),
        };
    } else {
        return {
            username: env
                .get('DEV_DB_USERNAME')
                .required()
                .asString(),
            password: env
                .get('DEV_DB_PASSWORD')
                .required()
                .asString(),
            database: env
                .get('DEV_DB_NAME')
                .required()
                .asString(),
        };
    }
};

const fileExtension = (): string => {
    if (env.get('NODE_ENV').asString() === 'production') {
        return '.js';
    }
    return '.ts';
};

const sourceDir = (): string => {
    if (env.get('NODE_ENV').asString() === 'production') {
        return 'dist';
    }
    return 'server';
};

const host = (): string => {
    if (env.get('NODE_ENV').asString() === 'production') {
        return 'host.docker.internal';
    } else {
        return 'localhost';
    }
};

const options = () => {
    return {
        entities: [`${sourceDir()}/db/entities/**/*${fileExtension()}`],
        migrations: [`${sourceDir()}/db/migrations/**/*${fileExtension()}`],
        subscribers: [`${sourceDir()}/db/subscribers/**/*${fileExtension()}`],
        cli: {
            entitiesDir: `${sourceDir()}/db/entities`,
            migrationsDir: `${sourceDir()}/db/migrations`,
            subscribersDir: `${sourceDir()}/db/subscribers`,
        },
    };
};

const initializeDB = async () => {
    await createConnection({
        // @ts-ignore
        type: env.get('DB_TYPE').asString() || 'postgres',
        host: env.get('DB_HOSTNAME').asString() || 'localhost',
        port: env.get('DB_PORT').asIntPositive() || 5432,
        synchronize: true,
        logging: false,
        ...options(),
        ...dbConfig(),
    });
};

export { initializeDB };

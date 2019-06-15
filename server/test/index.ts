import dotenv from 'dotenv';
dotenv.config();
import { before } from 'mocha';
import { initializeDB } from '../db';
import { getConnection } from 'typeorm';
import { User } from '../db/entities/User';

// Initialize stuff here
before(async () => {
    await initializeDB();
    await getConnection().synchronize(true);
});

after(async () => {
    await getConnection().close();
});

export const getUser = async (): Promise<User> => {
    const user = await getConnection()
        .getRepository(User)
        .findOne();
    return Promise.resolve(user as User);
};

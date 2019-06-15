import { Application } from 'express';
import { rootController, authController } from '../controllers';
import { requireParams } from '../middlewares/requireParams';
import { checkAuth } from '../middlewares/checkAuth';

const BASE_ROUTE = '/api';

export const initializeRoutes = (app: Application) => {
    app.get(`${BASE_ROUTE}/`, rootController.rootRoute);
    app.post(`${BASE_ROUTE}/test`, checkAuth, rootController.postTest);
    app.post(`${BASE_ROUTE}/login`, requireParams(['username', 'password']), authController.login);
    app.post(`${BASE_ROUTE}/register`, requireParams(['username', 'password']), authController.register);
    app.get(`${BASE_ROUTE}/loggedin`, checkAuth, authController.loggedIn);
};

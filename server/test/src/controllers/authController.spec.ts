import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import rootController from '../../../controllers/rootController';
import app from '../../../server';
import { getUser } from '../../../test';

chai.use(chaiHttp);

describe('AuthController spec', () => {
    it('Can log in with correct password', async () => {
        const user = await getUser();
        const response = await chai
            .request(app)
            .post('/api/login')
            .send(user);
        expect(response.status).to.eq(200);
    });
});

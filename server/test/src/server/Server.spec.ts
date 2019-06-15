import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';

chai.use(chaiHttp);

describe('Server', () => {
    it('starts and runs', async () => {
        const response = await chai.request(app).get('/api/');
        chai.expect(response).to.have.status(200);
        chai.expect(response.text).to.eq('Backend server is running A-OK! ENV: ' + process.env.NODE_ENV);
    });
});

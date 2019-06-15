import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';

chai.use(chaiHttp);

describe('RootController', () => {
    it('returns correct greeting', async () => {
        const response = await chai.request(app).get('/api/');
        expect(response.text).to.eq('Backend server is running A-OK! ENV: ' + process.env.NODE_ENV);
    });
});

const request = require('supertest');
const app = require('../src/app');

describe('Product API (smoke)', () => {
    it('creates and returns a product', async () => {
        const res = await request(app)
          .post('/api/products')
          .send({ name: 'TestProd', price: 9.99, description: 'test' });
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe('TestProd');
    });
});

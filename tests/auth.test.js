const request = require('supertest');
const app = require('../src/app');

afterAll((done) => {
    // Close the server to release the open handle
    app.closeServer(() => {
      done();
    });
});

describe('Authentication Endpoints', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should log in an existing user', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
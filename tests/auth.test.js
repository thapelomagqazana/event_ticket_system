
// npm test -- --detectOpenHandles

const request = require('supertest');
const app = require('../server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

afterAll((done) => {
    // Close the server to release the open handle
    app.closeServer(() => {
      done();
    });
});

describe('User Authentication Backend Tests', () => {
  // Mock database (replace this with your database integration)
  const users = [];
  const secretKey = 'yourSecretKey';

  // Test user registration
  test('User Registration', async () => {
    const newUser = { username: 'testuser', password: 'testpassword' };

    const response = await request(app)
      .post('/auth/register')
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'User registered successfully.');
  });

  // Test user login
  test('User Login', async () => {
    const loginUser = { username: 'testuser', password: 'testpassword' };

    // Mock bcrypt.compare to always return true during testing
    bcrypt.compare = jest.fn().mockResolvedValue(true);

    const response = await request(app)
      .post('/auth/login')
      .send(loginUser);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Login successful.');
    expect(response.body).toHaveProperty('token');

    // Decode and verify the JWT token
    const decoded = jwt.verify(response.body.token, secretKey);
    expect(decoded).toHaveProperty('username', loginUser.username);
  });
});
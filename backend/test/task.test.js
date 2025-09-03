const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../index');

describe('GET /api/tasks', () => {
  // Increase timeout for slow DB connections
  jest.setTimeout(20000);

  it('should return 200 OK', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
  });

  it('should return an object and tasks props', async () => { 
    const res = await request(app).get('/api/tasks');
    expect(typeof res.body.tasks).toBe('object');
    expect(res.body).toHaveProperty('tasks');
  });
});

// Close server + DB after all tests
afterAll(async () => {
  await mongoose.connection.close(); // ✅ Close DB
  await server.close();              // ✅ Close Express server
});

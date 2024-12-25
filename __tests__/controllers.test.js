const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

process.env.PORT = 3008;
const app = require('../app'); // Предполагается, что ваш express app находится в файле app.js
const User = require('../models/user');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');

// Mock process.env
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';

// Функция для создания тестового пользователя
const createUser = async (userData) => {
  const passwordHash = await bcrypt.hash(userData.password, 10);
  return User.create({ ...userData, password: passwordHash });
};

describe('Test all Controllers', () => {
  let user;
  let token;
  let response2;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test3', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    user = await createUser({
      email: 'test6@example.com',
      name: 'Test User',
      password: 'testpassword',
      tg: '@testuser',
    });
    token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '365d' });
    response2 = await request(app)
      .post('/signin')
      .send({ email: 'test6@example.com', password: 'testpassword' });
    token = response2._body.token;
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  describe('getMyInfo', () => {
    it('should return user info', async () => {
      const response = await request(app)
        .get('/users/me')
        .set('Authorization', `${response2._body.token}`);
      expect(response.status).toBe(200);
      expect(response.body.data).toMatchObject({
        name: 'Test User',
        email: 'test6@example.com',
        tg: '@testuser',
      });
    });

    it('should return 400 if user id is invalid', async () => {
      const invalidToken = jwt.sign({ _id: 'invalid-id' }, process.env.JWT_SECRET, { expiresIn: '365d' });
      const response = await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${invalidToken}`);
      expect(response.status).toBe(401);
      expect(response.body).toEqual(expect.objectContaining({ message: 'Необходима авторизация' }));
    });
  });

  describe('cart', () => {
    it('should update user name', async () => {
      const response = await request(app)
        .patch('/users/me/name')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Updated Name' });
      expect(response.status).toBe(SUCCESS_CODE);
      expect(response.body.data).toMatchObject({ name: 'Updated Name' });
    });

    it('should return 400 if name is invalid', async () => {
      const response = await request(app)
        .patch('/users/me/name')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: '' });
      expect(response.status).toBe(400);
    });
  });

  describe('good', () => {
    it('should update user tg', async () => {
      const response = await request(app)
        .patch('/users/me/tg')
        .set('Authorization', `Bearer ${token}`)
        .send({ tg: '@updatedtg' });
      expect(response.status).toBe(SUCCESS_CODE);
      expect(response.body.data).toMatchObject({ tg: '@updatedtg' });
    });

    it('should return 400 if tg is invalid', async () => {
      const response = await request(app)
        .patch('/users/me/tg')
        .set('Authorization', `Bearer ${token}`)
        .send({ tg: '' });
      expect(response.status).toBe(400);
    });
  });

  describe('brand', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/signup')
        .send({
          name: 'New User',
          email: 'new@example.com',
          password: 'newpassword',
          tg: '@newuser',
        });
      expect(response.status).toBe(CREATE_CODE);
      expect(response.body).toMatchObject({ name: 'New User', email: 'new@example.com' });
    });

    it('should return 400 if registration data is invalid', async () => {
      const response = await request(app)
        .post('/signup')
        .send({
          name: '',
          email: 'invalid-email',
          password: 'short',
          tg: '',
        });
      expect(response.status).toBe(400);
    });

    it('should return 409 if email is not unique', async () => {
      await request(app)
        .post('/signup')
        .send({
          name: 'New User',
          email: 'new@example.com',
          password: 'newpassword',
          tg: '@newuser',
        });
      const response = await request(app)
        .post('/signup')
        .send({
          name: 'New User',
          email: 'new@example.com',
          password: 'newpassword',
          tg: '@newuser',
        });
      expect(response.status).toBe(409);
      expect(response.body).toEqual(expect.objectContaining({ message: 'Данный email уже зарегистрирован' }));
    });
  });
});

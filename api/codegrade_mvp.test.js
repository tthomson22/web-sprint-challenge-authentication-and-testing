// Write your tests here
const server = require('./server')
const db = require('../data/dbConfig')
const request = require('supertest')

beforeAll(async() => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

afterAll(async() => {
  await db.destroy()
})

//sanity check
test('sanity', () => {
  expect(true).toBe(true)
})

describe('/register', () => {
  test('returns status 201', async() => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'name', password: '12345' })
    expect(res.status).toBe(201)
  })
  test('returns status 422', async() => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'name', password: '' })
    expect(res.status).toBe(422)
  })
})

describe('/login', () => {
  test('returns status 201', async () =>{
    const res = await request(server)
      .post('/api/auth/login')
      .send({username: 'name', password: '12345'})
    expect(res.status).toBe(201)
  })
  test('returns status 422', async() => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'name', password: '' })
    expect(res.status).toBe(422)
  })
})

describe('/jokes', () => {
  test('resturns status', async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.status).toBe(401)
  })
  test('returns message', async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.body.message).toBe('token required')
  })
})
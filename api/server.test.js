// Write your tests here
const server = require('./server')
const db = require('../data/dbConfig')
const request = require('supertest')

beforeAll(async() => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async() => {
  await db('users').truncate();
})

//sanity check
test('sanity', () => {
  expect(true).toBe(true)
})

afterAll(async() => {
  await db.destroy()
})
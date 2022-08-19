process.env.NODE_ENV = 'test'; 

const express = require('express'); 
const request = require('supertest'); 
const app = require('../app');
const items = require('../fakeDb'); 

let cheerios = { name: 'cheerios', price: 3.40 }; 

beforeEach(() => {
  items.push(cheerios); 
})

afterEach(() => {
  items.length = 0; 
})

describe('Get /items', () => {
  test("Getting all items", async () => {
    const res = await request(app).get('/items'); 

    expect(res.statusCode).toBe(200); 
    expect(res.body).toEqual({ items }); 
  })
})

describe('Get /items/:name', () => {
  test('Get item by name', async() => {
    const res = await request(app).get(`/items/${cheerios.name}`); 

    expect(res.statusCode).toBe(200); 
    expect(res.body).toEqual(cheerios); 
  })
})

describe('Post /items', () => {
  test('Creating a new item', async () => {
    const res = await request(app).post('/items').send({name: 'popsicle', price: 1.45}); 

    expect(res.statusCode).toBe(201); 
    expect(res.body).toEqual({added: {name: 'popsicle', price: 1.45}}); 
  })
})

describe('Patch /items/:name', () => {
  test('Patching an item', async () => {
    const res = await request(app).patch(`/items/${cheerios.name}`).send({name: 'cheerios', price: 4.00}); 

    expect(res.statusCode).toBe(200); 
    expect(res.body).toEqual({updated: {name: 'cheerios', price: 4.00}}); 
  })
})

describe('Delete /items/:name', () => {
  test('Deleting an item', async () => {
    const res = await request(app).delete(`/items/${cheerios.name}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({message: "Deleted"}); 
  })
})
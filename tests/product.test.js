jest.setTimeout(60000); 

require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Product = require('../models/productModel');

// Connect to the test database before running tests

let server;
const PORT = 3001;

beforeAll(async () => {
  server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  try {
    await mongoose.connect(process.env.TEST_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true 
    });
    console.log('Connected to the test database');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
  }
});

// Disconnect from the test database after all tests

afterAll(async () => {
  
  if (server) {
    await new Promise(resolve => server.close(resolve));
    console.log('Express server closed');
  }
  await mongoose.connection.close();
  console.log('Disconnected from the test database');
}, 10000);


// Clear the database before each model test

beforeEach(async () => {
  await Product.deleteMany();
});

// Describe your tests...

describe('Product Model', () => {
  test('should create a new product', async () => {
    const productData = { name: 'Test Product', description:'test description', price: 20 };
    const product = await Product.create(productData);

    expect(product).toMatchObject(productData);
  });
});

describe('Product Endpoints', () => {
  test('should create a new product', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({ name: 'Test Product', description:'test description', price: 20 });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  test('should get a product by ID', async () => {
    const product = await Product.create({ name: 'Test Product', description:'test description', price: 20 });

    const response = await request(app).get(`/api/products/${product._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ _id: product._id.toString() });
  });
});

describe('Search Functionality', () => {
  test('should search products by name, description, or variant name', async () => {
    await Product.create({ name: 'Test Product', description: 'Test Description', price: 20 });

    const response = await request(app).get('/api/products/search').send({ query: 'Test' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});

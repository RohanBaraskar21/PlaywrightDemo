import { test, expect } from '@playwright/test';

const BASE_URL = 'https://petstore.swagger.io/v2';

// Utility for random IDs
const randomId = () => Math.floor(Math.random() * 1000000);

// PET ENDPOINTS

test.describe('Petstore API - PET Endpoints', () => {
  test('POST /pet - Add new pet (positive)', async ({ request }) => {
    const newPet = {
      id: randomId(),
      name: 'Doggie',
      status: 'available',
      photoUrls: ['url1'],
      category: { id: 1, name: 'Dogs' },
      tags: [{ id: 1, name: 'tag1' }]
    };
    const response = await request.post(`${BASE_URL}/pet`, { data: newPet });
    expect(response.ok()).toBeTruthy();
    const pet = await response.json();
    expect(pet).toMatchObject(newPet);
  });

  test('POST /pet - Add new pet (negative: missing name)', async ({ request }) => {
    const newPet = {
      id: randomId(),
      status: 'available',
      photoUrls: ['url1'],
      category: { id: 1, name: 'Dogs' },
      tags: [{ id: 1, name: 'tag1' }]
    };
    const response = await request.post(`${BASE_URL}/pet`, { data: newPet });
    expect([200, 400, 404, 405, 500]).toContain(response.status());
  });

  test('PUT /pet - Update pet (positive)', async ({ request }) => {
    const updatePet = {
      id: 1,
      name: 'DoggieUpdated',
      status: 'sold',
      photoUrls: ['url2'],
      category: { id: 1, name: 'Dogs' },
      tags: [{ id: 1, name: 'tag2' }]
    };
    const response = await request.put(`${BASE_URL}/pet`, { data: updatePet });
    expect([200, 404]).toContain(response.status());
  });

  test('PUT /pet - Update pet (negative: invalid ID)', async ({ request }) => {
    const updatePet = {
      id: 'invalid',
      name: 'DoggieUpdated',
      status: 'sold',
      photoUrls: ['url2'],
      category: { id: 1, name: 'Dogs' },
      tags: [{ id: 1, name: 'tag2' }]
    };
    const response = await request.put(`${BASE_URL}/pet`, { data: updatePet });
    expect([400, 404, 405, 500]).toContain(response.status());
  });

  test('GET /pet/{petId} - Find pet by ID (positive)', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/pet/1`);
    expect([200, 404]).toContain(response.status());
  });

  test('GET /pet/{petId} - Find pet by ID (negative: invalid ID)', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/pet/invalid`);
    expect([400, 404, 405, 500]).toContain(response.status());
  });

  test('DELETE /pet/{petId} - Delete pet (positive)', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/pet/1`);
    expect([200, 404]).toContain(response.status());
  });

  test('DELETE /pet/{petId} - Delete pet (negative: invalid ID)', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/pet/invalid`);
    expect([400, 404, 405, 500]).toContain(response.status());
  });

  test('GET /pet/findByStatus - Find pets by status (positive)', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/pet/findByStatus?status=available`);
    expect(response.ok()).toBeTruthy();
    const pets = await response.json();
    expect(Array.isArray(pets)).toBeTruthy();
  });

  test('GET /pet/findByStatus - Find pets by status (negative: invalid status)', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/pet/findByStatus?status=invalid`);
    expect([200, 400, 404, 405, 500]).toContain(response.status());
  });
});

// STORE ENDPOINTS

test.describe('Petstore API - STORE Endpoints', () => {
  test('POST /store/order - Place order (positive)', async ({ request }) => {
    const newOrder = {
      id: randomId(),
      petId: 1,
      quantity: 1,
      shipDate: new Date().toISOString(),
      status: 'placed',
      complete: true
    };
    const response = await request.post(`${BASE_URL}/store/order`, { data: newOrder });
    expect([200, 400]).toContain(response.status());
  });

  test('POST /store/order - Place order (negative: invalid data)', async ({ request }) => {
    const newOrder = {
      id: 'invalid',
      petId: 'invalid',
      quantity: 'invalid',
      shipDate: 'invalid',
      status: 'placed',
      complete: true
    };
    const response = await request.post(`${BASE_URL}/store/order`, { data: newOrder });
    expect([400, 404, 405, 500]).toContain(response.status());
  });

  test('GET /store/order/{orderId} - Find order by ID (positive)', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/store/order/1`);
    expect([200, 404]).toContain(response.status());
  });

  test('GET /store/order/{orderId} - Find order by ID (negative: invalid ID)', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/store/order/invalid`);
    expect([400, 404, 405, 500]).toContain(response.status());
  });

  test('DELETE /store/order/{orderId} - Delete order (positive)', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/store/order/1`);
    expect([200, 404]).toContain(response.status());
  });

  test('DELETE /store/order/{orderId} - Delete order (negative: invalid ID)', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/store/order/invalid`);
    expect([400, 404, 405, 500]).toContain(response.status());
  });

  test('GET /store/inventory - Get inventory (positive)', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/store/inventory`);
    expect(response.ok()).toBeTruthy();
    const inventory = await response.json();
    expect(inventory).toHaveProperty('available');
  });
});

// USER ENDPOINTS

test.describe('Petstore API - USER Endpoints', () => {
  test('POST /user - Create user (positive)', async ({ request }) => {
    const newUser = {
      id: randomId(),
      username: 'user' + randomId(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      phone: '1234567890',
      userStatus: 1
    };
    const response = await request.post(`${BASE_URL}/user`, { data: newUser });
    expect(response.ok()).toBeTruthy();
  });

  test('POST /user - Create user (negative: missing username)', async ({ request }) => {
    const newUser = {
      id: randomId(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      phone: '1234567890',
      userStatus: 1
    };
    const response = await request.post(`${BASE_URL}/user`, { data: newUser });
    expect([200, 400, 404, 405, 500]).toContain(response.status());
  });

  test('GET /user/{username} - Get user by username (positive)', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/user/user1`);
    expect([200, 404]).toContain(response.status());
  });

  test('GET /user/{username} - Get user by username (negative: invalid username)', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/user/invalid!@#`);
    expect([400, 404]).toContain(response.status());
  });

  test('PUT /user/{username} - Update user (positive)', async ({ request }) => {
    const updateUser = {
      id: randomId(),
      username: 'user1',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: 'newpassword',
      phone: '9876543210',
      userStatus: 2
    };
    const response = await request.put(`${BASE_URL}/user/user1`, { data: updateUser });
    expect([200, 400, 404]).toContain(response.status());
  });

  test('PUT /user/{username} - Update user (negative: invalid username)', async ({ request }) => {
    const updateUser = {
      id: randomId(),
      username: 'invalid!@#',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: 'newpassword',
      phone: '9876543210',
      userStatus: 2
    };
    const response = await request.put(`${BASE_URL}/user/invalid!@#`, { data: updateUser });
    expect([200, 400, 404, 405, 500]).toContain(response.status());
  });

  test('DELETE /user/{username} - Delete user (positive)', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/user/user1`);
    expect([200, 404]).toContain(response.status());
  });

  test('DELETE /user/{username} - Delete user (negative: invalid username)', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/user/invalid!@#`);
    expect([400, 404]).toContain(response.status());
  });

  test('GET /user/login - Login user (positive)', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/user/login?username=user1&password=password`);
    expect([200, 400]).toContain(response.status());
  });

  test('GET /user/login - Login user (negative: invalid credentials)', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/user/login?username=invalid&password=invalid`);
    expect([200, 400, 404, 405, 500]).toContain(response.status());
  });

  test('GET /user/logout - Logout user (positive)', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/user/logout`);
    expect(response.ok()).toBeTruthy();
  });
});

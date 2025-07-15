import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://petstore.swagger.io/v2';

// Example: GET /pet/findByStatus
const findByStatusEndpoint = '/pet/findByStatus?status=available';

test.describe('Petstore API Suite', () => {
  test('GET /pet/findByStatus returns available pets @smoke', async ({ request }) => {
    const response = await request.get(`${BASE_URL}${findByStatusEndpoint}`);
    expect(response.ok()).toBeTruthy();
    const pets = await response.json();
    expect(Array.isArray(pets)).toBeTruthy();
    expect(pets.length).toBeGreaterThan(0);
    expect(pets[0]).toHaveProperty('status', 'available');
  });

  test('POST /pet creates a new pet @smoke', async ({ request }) => {
    const newPet = {
      id: Date.now(),
      name: 'TestPet',
      status: 'available',
      photoUrls: [],
      category: { id: 1, name: 'Dogs' },
      tags: []
    };
    const response = await request.post(`${BASE_URL}/pet`, {
      data: newPet,
    });
    expect(response.ok()).toBeTruthy();
    const pet = await response.json();
    expect(pet).toMatchObject(newPet);
  });

  test('GET /pet/{petId} returns pet details @smoke', async ({ request }) => {
    const petId = 1; // Example petId
    const response = await request.get(`${BASE_URL}/pet/${petId}`);
    expect(response.status()).toBe(200);
    const pet = await response.json();
    expect(pet).toHaveProperty('id', petId);
  });

  test('DELETE /pet/{petId} deletes a pet @smoke', async ({ request }) => {
    const petId = 1; // Example petId
    const response = await request.delete(`${BASE_URL}/pet/${petId}`);
    expect([200, 404]).toContain(response.status()); // 404 if pet doesn't exist
  });

  test('GET /store/inventory returns inventory', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/store/inventory`);
    expect(response.ok()).toBeTruthy();
    const inventory = await response.json();
    expect(inventory).toHaveProperty('available');
  });

  test('GET /user/{username} returns user details', async ({ request }) => {
    const username = 'testuser';
    const response = await request.get(`${BASE_URL}/user/${username}`);
    expect([200, 404]).toContain(response.status()); // 404 if user doesn't exist
  });
});

const axios = require("axios");

const BASE_URL = "http://localhost:3000";
const USER_CREDENTIALS = { email: "diego@email.com", password: "1234" };
let token;

beforeAll(async () => {
  const res = await axios.post(`${BASE_URL}/auth`, USER_CREDENTIALS);
  token = res.data.token;
});

describe("Auth Tests", () => {
  test("should return a token on successful login", async () => {
    const res = await axios.post(`${BASE_URL}/auth`, USER_CREDENTIALS);
    expect(res.status).toBe(200);
    expect(res.data.token).toBeDefined();
  });

  test("should not return a token for invalid credentials", async () => {
    try {
      await axios.post(`${BASE_URL}/auth`, {
        email: "wrong@email.com",
        password: "wrongpassword",
      });
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data.token).toBeUndefined();
    }
  });
});

describe("Game CRUD Operations", () => {
  test("should fetch all games", async () => {
    const res = await axios.get(`${BASE_URL}/games`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });

  test("should fetch a game by ID", async () => {
    const res = await axios.get(`${BASE_URL}/game/1`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty("id", 1);
  });

  test("should return 404 for a non-existent game ID", async () => {
    try {
      await axios.get(`${BASE_URL}/game/999`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("should create a new game", async () => {
    const newGame = { title: "Test Game", year: 2023, price: 50 };
    const res = await axios.post(`${BASE_URL}/game`, newGame, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status).toBe(201);
  });

  test("should update an existing game", async () => {
    const updatedGame = { title: "Updated Game", year: 2024, price: 70 };
    const res = await axios.put(`${BASE_URL}/game/1`, updatedGame, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status).toBe(200);
  });

  test("should delete a game by ID", async () => {
    const res = await axios.delete(`${BASE_URL}/game/1`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status).toBe(200);
  });

  test("should return 404 when deleting a non-existent game", async () => {
    try {
      await axios.delete(`${BASE_URL}/game/999`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});

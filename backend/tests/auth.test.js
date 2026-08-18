const request = require("supertest");

const app = require("../app");

describe("Authentication API", () => {
  test("POST /api/auth/register should require fields", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "test@example.com",
    });

    expect(response.statusCode).toBe(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe("Name, email and password are required");
  });
});

test("POST /api/auth/login should require email and password", async () => {
  const response = await request(app).post("/api/auth/login").send({
    email: "test@example.com",
  });

  expect(response.statusCode).toBe(400);

  expect(response.body.success).toBe(false);

  expect(response.body.message).toBe("Email and password are required");
});

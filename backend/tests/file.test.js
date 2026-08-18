const request = require("supertest");

const app = require("../app");

describe("File API authentication", () => {
  test("GET /api/files should reject unauthenticated requests", async () => {
    const response = await request(app).get("/api/files");

    expect(response.statusCode).toBe(401);

    expect(response.body.success).toBe(false);
  });
});

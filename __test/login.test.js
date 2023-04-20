const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../app");

const { DB_HOST, PORT = 3000 } = process.env;

describe("Test login endpoint", () => {
  let server = null;

  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  test("should return status code 200 and a token", async () => {
    const loginData = {
      email: "andrii@mail.com",
      password: "123456",
    };

    const res = await request(app).post("/api/users/login").send(loginData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("should return user object with email and subscription fields", async () => {
    const loginData = {
      email: "andrii@mail.com",
      password: "123456",
    };
    const res = await request(app).post("/api/users/login").send(loginData);
    expect(res.body.user).toHaveProperty("email");
    expect(typeof res.body.user.email).toBe("string");
    expect(res.body.user).toHaveProperty("subscription");
    expect(typeof res.body.user.subscription).toBe("string");
  });
});

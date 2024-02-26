import mongoose from "mongoose";
import request from "supertest";
import app from "../index";

var token: string;

const user = {
  name: "Test User",
  email: Math.random() + "@test.com",
  password: "password",
};

beforeEach(async () => {
  // jest.spyOn(console, "log").mockImplementation(() => {});
  await request(app).post("/api/auth/register").send(user);
  const res = await request(app).post("/api/auth/login").send(user);
  token = res.body.data.token;
});

afterAll(async () => {
  await mongoose.connection.db?.dropDatabase();
  await mongoose.disconnect();
});

export { token, user };

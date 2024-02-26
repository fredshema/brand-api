import request from "supertest";
import app from "..";
import { Role } from "../models/user";
import "./setup";

const user = {
  name: "Test Auth",
  email: Math.random() + "@test.com",
  role: Role.GUEST,
  password: "password",
};

describe("POST /api/auth/signup", () => {
  it("should signup a new user", async () => {
    const res = await request(app).post("/api/auth/register").send(user);

    console.log({ res });

    expect(res.status).toEqual(201);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.user).toBeInstanceOf(Object);
    expect(res.body.data.user.name).toEqual(user.name);
    expect(res.body.data.user.email).toEqual(user.email);
    expect(res.body.data.user.role).toEqual(user.role);
  });
});

describe("POST /api/auth/login", () => {
  it("should authenticate a user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });

    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.token).toBeTruthy();
  });
});

import { ObjectId } from "mongodb";
import request from "supertest";
import app from "../index";
import { token } from "./setup";

var userId: ObjectId;
const user = {
  name: "John Doe",
  email: Math.random() + "@john.com",
  password: "password",
};

const updatedUser = {
  name: "Doe John",
  email: Math.random() + "@doe.com",
};

describe("GET /api/users", () => {
  it("should list all users", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", token);

    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.users).toBeInstanceOf(Array);
  });
});

describe("GET /api/users/:id", () => {
  it("should return a single user", async () => {
    const users = await request(app)
      .get("/api/users")
      .set("Authorization", token);
    const id = users.body.data.users[0]._id;

    const res = await request(app)
      .get(`/api/users/${id}`)
      .set("Authorization", token);

    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.user).toBeInstanceOf(Object);
    expect(res.body.data.user._id).toEqual(id);
  });
});

describe("POST /api/users", () => {
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/users")
      .set("Authorization", token)
      .send(user);

    userId = res.body.data?.user._id;

    expect(res.status).toEqual(201);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.user).toBeInstanceOf(Object);
    expect(res.body.data.user.name).toEqual(user.name);
    expect(res.body.data.user.email).toEqual(user.email);
  });
});

describe("PUT /api/users/:id", () => {
  it("should update a user", async () => {
    const res = await request(app)
      .put(`/api/users/${userId.toString()}`)
      .set("Authorization", token)
      .send(updatedUser);

    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.user).toBeInstanceOf(Object);
    expect(res.body.data.user.name).toEqual(updatedUser.name);
    expect(res.body.data.user.email).toEqual(updatedUser.email);
  });
});

describe("DELETE /api/users/:id", () => {
  it("should delete a user", async () => {
    const res = await request(app)
      .delete(`/api/users/${userId.toString()}`)
      .set("Authorization", token);

    expect(res.status).toEqual(204);
  });
});

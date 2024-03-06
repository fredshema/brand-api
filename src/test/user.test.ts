import { ObjectId } from "mongodb";
import request from "supertest";
import app from "../index";
import { token } from "./setup";

var userId: ObjectId;
const randomId = "5f3e3e3e3e3e3e3e3e3e3e3e";
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

  it("should return 401 if no token is provided", async () => {
    const res = await request(app).get("/api/users");

    expect(res.status).toEqual(401);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
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

  it("should return 404 if user is not found", async () => {
    const res = await request(app)
      .get(`/api/users/${randomId}`)
      .set("Authorization", token);

    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app).get(`/api/users/${randomId}`);

    expect(res.status).toEqual(401);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
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

  it("should return 401 if no token is provided", async () => {
    const res = await request(app).post("/api/users").send(user);

    expect(res.status).toEqual(401);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });

  it("should return 400 if user already exists", async () => {
    const res = await request(app)
      .post("/api/users")
      .set("Authorization", token)
      .send(user);

    expect(res.status).toEqual(400);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
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

  it("should return 401 if no token is provided", async () => {
    const res = await request(app)
      .put(`/api/users/${userId.toString()}`)
      .send(updatedUser);

    expect(res.status).toEqual(401);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });

  it("should return 404 if user is not found", async () => {
    const res = await request(app)
      .put(`/api/users/${randomId}`)
      .set("Authorization", token)
      .send(updatedUser);

    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });
});

describe("DELETE /api/users/:id", () => {
  it("should delete a user", async () => {
    const res = await request(app)
      .delete(`/api/users/${userId.toString()}`)
      .set("Authorization", token);

    expect(res.status).toEqual(204);
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app).delete(`/api/users/${userId.toString()}`);

    expect(res.status).toEqual(401);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });

  it("should return 404 if user is not found", async () => {
    const res = await request(app)
      .delete(`/api/users/${randomId}`)
      .set("Authorization", token);

    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });
});

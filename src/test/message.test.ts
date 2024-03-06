import { ObjectId } from "mongodb";
import request from "supertest";
import app from "../index";
import { token } from "./setup";

var messageId: ObjectId;
const randomId = "5f3e3e3e3e3e3e3e3e3e3e3e";
const message = {
  name: "John Doe",
  email: Math.random() + "@john.com",
  message: "Hello World",
};

const updatedMessage = {
  name: "Doe John",
  email: Math.random() + "@doe.com",
  message: "World Hello",
};

describe("POST /api/messages", () => {
  it("should create a new message", async () => {
    const res = await request(app).post("/api/messages").send(message);

    messageId = res.body.data?.message._id;

    expect(res.status).toEqual(201);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.message).toBeInstanceOf(Object);
    expect(res.body.data.message.name).toEqual(message.name);
  });
});

describe("GET /api/messages", () => {
  it("should list all messages", async () => {
    const res = await request(app)
      .get("/api/messages")
      .set("Authorization", token);

    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.messages).toBeInstanceOf(Array);
    expect(res.body.data.messages.length).toBeGreaterThan(0);
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app).get("/api/messages");

    expect(res.status).toEqual(401);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });

  it("should return 401 if invalid token is provided", async () => {
    const res = await request(app)
      .get("/api/messages")
      .set("Authorization", "Bearer " + randomId);

    expect(res.status).toEqual(401);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });
});

describe("GET /api/messages/:id", () => {
  it("should get a message by id", async () => {
    const res = await request(app)
      .get(`/api/messages/${messageId}`)
      .set("Authorization", token);

    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.message).toBeInstanceOf(Object);
    expect(res.body.data.message.name).toEqual(message.name);
  });

  it("should return 404 if message not found", async () => {
    const res = await request(app)
      .get(`/api/messages/${randomId}`)
      .set("Authorization", token);

    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app).get(`/api/messages/${messageId}`);

    expect(res.status).toEqual(401);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });
});

describe("PUT /api/messages/:id", () => {
  it("should update a message by id", async () => {
    const res = await request(app)
      .put(`/api/messages/${messageId}`)
      .set("Authorization", token)
      .send(updatedMessage);

    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.message).toBeInstanceOf(Object);
    expect(res.body.data.message.name).toEqual(updatedMessage.name);
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app)
      .put(`/api/messages/${messageId}`)
      .send(updatedMessage);

    expect(res.status).toEqual(401);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });

  it("should return 404 if message not found", async () => {
    const res = await request(app)
      .put(`/api/messages/${randomId}`)
      .set("Authorization", token)
      .send(updatedMessage);

    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined(); 
  });
});

describe("DELETE /api/messages/:id", () => {
  it("should delete a message by id", async () => {
    const res = await request(app)
      .delete(`/api/messages/${messageId}`)
      .set("Authorization", token);

    expect(res.status).toEqual(204);
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app).delete(`/api/messages/${messageId}`);

    expect(res.status).toEqual(401);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });
});

import request from "supertest";
import app from "../index";
import { token } from "./setup";

var articleId: string;
var commentId: string;
const randomId = "5f3e3e3e3e3e3e3e3e3e3e3e";

const article = {
  title: "Hello World",
  content: "This is a test article",
};

const comment = {
  content: "This is a test comment",
};

const updatedComment = {
  content: "This is an updated test comment",
};

describe("POST /api/articles/:id/comments", () => {
  it("should create a new comment for an article", async () => {
    const res = await request(app)
      .post("/api/articles")
      .set("Authorization", token)
      .send(article);

    articleId = res.body.data.article._id;

    const commentRes = await request(app)
      .post(`/api/articles/${articleId}/comments`)
      .set("Authorization", token)
      .send(comment);

    commentId = commentRes.body.data.comment._id;

    expect(commentRes.status).toEqual(201);
    expect(commentRes.body.status).toEqual("success");
    expect(commentRes.body.data.comment).toBeInstanceOf(Object);
    expect(commentRes.body.data.comment.content).toEqual(comment.content);
  });

  it("should return 404 if article is not found", async () => {
    const res = await request(app)
      .post(`/api/articles/${randomId}/comments`)
      .set("Authorization", token)
      .send(comment);

    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app)
      .post(`/api/articles/${articleId}/comments`)
      .send(comment);

    expect(res.status).toEqual(401);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });
});

describe("GET /api/articles/:id/comments", () => {
  it("should get all comments for an article", async () => {
    const res = await request(app)
      .get(`/api/articles/${articleId}/comments`)
      .set("Authorization", token);

    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.comments).toBeInstanceOf(Array);
    expect(res.body.data.comments.length).toBeGreaterThan(0);
  });

  it("should return 404 if article is not found", async () => {
    const res = await request(app)
      .get(`/api/articles/${randomId}/comments`)
      .set("Authorization", token);

    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });
});

describe("GET /api/articles/:id/comments/:id", () => {
  it("should get a single comment for an article", async () => {
    const res = await request(app)
      .get(`/api/articles/${articleId}/comments/${commentId}`)
      .set("Authorization", token);

    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.comment).toBeInstanceOf(Object);
    expect(res.body.data.comment.content).toEqual(comment.content);
  });

  it("should return 404 if article is not found", async () => {
    const res = await request(app)
      .get(`/api/articles/${randomId}/comments/${randomId}`)
      .set("Authorization", token);

    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });
});

describe("PUT /api/articles/:id/comments/:id", () => {
  it("should update a single comment for an article", async () => {
    const res = await request(app)
      .put(`/api/articles/${articleId}/comments/${commentId}`)
      .set("Authorization", token)
      .send(updatedComment);

    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.comment).toBeInstanceOf(Object);
    expect(res.body.data.comment.content).toEqual(updatedComment.content);
  });

  it("should not update a single comment for an article", async () => {
    const res = await request(app)
      .put(`/api/articles/${articleId}/comments/${commentId}`)
      .send(updatedComment);

    expect(res.status).toEqual(401);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });

  it("should return 404 if article is not found", async () => {
    const res = await request(app)
      .put(`/api/articles/${randomId}/comments/${randomId}`)
      .set("Authorization", token)
      .send(updatedComment);

    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });
});

describe("DELETE /api/articles/:id/comments/:id", () => {
  it("should delete a single comment for an article", async () => {
    const res = await request(app)
      .delete(`/api/articles/${articleId}/comments/${commentId}`)
      .set("Authorization", token);

    expect(res.status).toEqual(204);
  });

  it("should not delete a single comment for an article", async () => {
    const res = await request(app).delete(
      `/api/articles/${articleId}/comments/${commentId}`
    );

    expect(res.status).toEqual(401);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });

  it("should not delete a single comment for an article", async () => {
    const res = await request(app)
      .delete(`/api/articles/${randomId}/comments/${randomId}`)
      .set("Authorization", token);

    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });
});

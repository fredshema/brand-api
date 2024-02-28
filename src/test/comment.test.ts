import request from "supertest";
import app from "../index";
import { token } from "./setup";

var articleId: string;
var commentId: string;

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
});

describe("DELETE /api/articles/:id/comments/:id", () => {
  it("should delete a single comment for an article", async () => {
    const res = await request(app)
      .delete(`/api/articles/${articleId}/comments/${commentId}`)
      .set("Authorization", token);

    expect(res.status).toEqual(204);
  });
});

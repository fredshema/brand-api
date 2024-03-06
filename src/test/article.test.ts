import request from "supertest";
import app from "../index";
import { token } from "./setup";

var articleId: string;
const randomId = "5f3e3e3e3e3e3e3e3e3e3e3e";

const article = {
  title: "Hello World",
  content: "This is a test article",
};

const updatedArticle = {
  title: "World Hello",
  content: "This is an updated test article",
};

describe("POST /api/articles", () => {
  it("should create a new article", async () => {
    const res = await request(app)
      .post("/api/articles")
      .set("Authorization", token)
      .send(article);

    articleId = res.body.data.article._id;

    expect(res.status).toEqual(201);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.article).toBeInstanceOf(Object);
    expect(res.body.data.article.title).toEqual(article.title);
    expect(res.body.data.article.content).toEqual(article.content);
  });
});

describe("GET /api/articles", () => {
  it("should list all articles", async () => {
    const res = await request(app).get("/api/articles");

    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.articles).toBeInstanceOf(Array);
    expect(res.body.data.articles.length).toBeGreaterThan(0);
  });
});

describe("GET /api/articles/:id", () => {
  it("should return a single article", async () => {
    const res = await request(app).get(`/api/articles/${articleId}`);

    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.article).toBeInstanceOf(Object);
    expect(res.body.data.article._id).toEqual(articleId);
  });
});

describe("GET /api/articles/:id", () => {
  it("should not find an article", async () => {
    const res = await request(app).get(`/api/articles/${randomId}`);

    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });
});

describe("GET /api/articles/:id/like", () => {
  it("should like an article", async () => {
    const res = await request(app)
      .get(`/api/articles/${articleId}/like`)
      .set("Authorization", token);

    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.article).toBeInstanceOf(Object);
    expect(res.body.data.article._id).toEqual(articleId);
    expect(res.body.data.article.likes).toBeGreaterThan(0);
  });

  it("should not like an article", async () => {
    const res = await request(app)
      .get(`/api/articles/${randomId}/like`)
      .set("Authorization", token);

    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });
});

describe("GET /api/articles/:id/unlike", () => {
  it("should unlike an article", async () => {
    const res = await request(app)
      .get(`/api/articles/${articleId}/unlike`)
      .set("Authorization", token);

    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.article).toBeInstanceOf(Object);
    expect(res.body.data.article._id).toEqual(articleId);
    expect(res.body.data.article.likes).toEqual(0);
  });

  it("should not unlike an article", async () => {
    const res = await request(app)
      .get(`/api/articles/${randomId}/unlike`)
      .set("Authorization", token);

    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });
});

describe("PUT /api/articles/:id", () => {
  it("should update an article", async () => {
    const res = await request(app)
      .put(`/api/articles/${articleId}`)
      .set("Authorization", token)
      .send(updatedArticle);

    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data.article).toBeInstanceOf(Object);
    expect(res.body.data.article.title).toEqual(updatedArticle.title);
    expect(res.body.data.article.content).toEqual(updatedArticle.content);
  });

  it("should not update an article", async () => {
    const res = await request(app).put(`/api/articles/${articleId}`).send(updatedArticle);

    expect(res.status).toEqual(401);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });

  it("should not update an article", async () => {
    const res = await request(app)
      .put(`/api/articles/${randomId}`)
      .set("Authorization", token)
      .send(updatedArticle);

    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });
});

describe("DELETE /api/articles/:id", () => {
  it("should delete an article", async () => {
    const res = await request(app)
      .delete(`/api/articles/${articleId}`)
      .set("Authorization", token);

    expect(res.status).toEqual(204);
  });

  it("should not delete an article", async () => {
    const res = await request(app).delete(`/api/articles/${articleId}`);

    expect(res.status).toEqual(401);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });

  it("should not delete an article", async () => {
    const res = await request(app)
      .delete(`/api/articles/${randomId}`)
      .set("Authorization", token);

    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual("error");
    expect(res.body.message).toBeDefined();
  });
});

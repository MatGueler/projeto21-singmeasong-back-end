import supertest from "supertest";
import { prisma } from "../src/database";
import app from "../src/app";
import dotenv from "dotenv";
import { generateFactory } from "./factory/createRecomendationsFactory";
import { getDataFactory } from "./factory/getDataRecomendation";

dotenv.config();

// beforeEach(async () => {
//   await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
// });

// afterAll(async () => {
//   await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
//   prisma.$disconnect();
// });

const agent = supertest(app);

describe("POST /recommendations", () => {
  it("Create a new recomendation", async () => {
    const body = await generateFactory.createRandomRecomendation();
    const result = await agent.post(`/recommendations`).send(body);
    expect(result.status).toBe(201);
  });

  it("Error about schema", async () => {
    const body = await generateFactory.createBadRecomendation();
    const result = await agent.post(`/recommendations`).send(body);
    expect(result.status).toBe(422);
  });
});

describe("POST /recommendations/:id/upvote", () => {
  it("Add a recommendation score", async () => {
    const id = await getDataFactory.getIdRecomendation();
    const result = await agent.post(`/recommendations/${id}/upvote`).send();
    expect(result.status).toBe(200);
  });
});

describe("POST /recommendations/:id/downvote", () => {
  it("Remove a recommendation score", async () => {
    const id = await getDataFactory.getIdRecomendation();
    const result = await agent.post(`/recommendations/${id}/downvote`).send();
    expect(result.status).toBe(200);
  });

  it("Remove a recommendation score", async () => {
    const id = await getDataFactory.getIdRecomendation();
    await agent.post(`/recommendations/${id}/downvote`).send();
    await agent.post(`/recommendations/${id}/downvote`).send();
    await agent.post(`/recommendations/${id}/downvote`).send();
    await agent.post(`/recommendations/${id}/downvote`).send();
    await agent.post(`/recommendations/${id}/downvote`).send();
    await agent.post(`/recommendations/${id}/downvote`).send();
    const result = await getDataFactory.getScoreRecomendation();
    expect(result).toBe(0);
  });
});

describe("GET /recommendations", () => {
  it("Get 10 recomendations", async () => {
    const result = await agent.get(`/recommendations`).send();
    expect(result.status).toBe(200);
  });
});

describe("GET /recommendations/:id", () => {
  it("Get recomendations by id", async () => {
    const id = await getDataFactory.getIdRecomendation();
    const result = await agent.get(`/recommendations/${id}`).send();
    expect(result.status).toBe(200);
  });
});

describe("GET /recommendations/random", () => {
  it("Get recomendations by randomic id", async () => {
    await generateFactory.createRandomRecomendation();
    const id = await generateFactory.createRandomicId();
    console.log(id);
    // const result = await agent.get(`/recommendations/${id}`).send();
    // expect(result.status).toBe(200);
  });
});

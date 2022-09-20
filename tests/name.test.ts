import supertest from "supertest";
import { prisma } from "../src/database";
import app from "../src/app";
import dotenv from "dotenv";
import { generateFactory } from "./factory/createRecomendationsFactory";

dotenv.config();

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
});

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
  prisma.$disconnect();
});

const agent = supertest(app);

describe("POST /recommendations", () => {
  it("user register", async () => {
    console.log(process.env.DATABASE_URL);
    const body = await generateFactory.createRandomRecomendation();
    const result = await agent.post(`/recommendations`).send(body);
    expect(result.status).toBe(201);
  });
});

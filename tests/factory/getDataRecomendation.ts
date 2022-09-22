import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/database";
import { generateFactory } from "./createRecomendationsFactory";
const agent = supertest(app);

async function getIdRecomendation() {
  const body = await generateFactory.createRandomRecomendation();
  await agent.post(`/recommendations`).send(body);
  const { id } = await prisma.recommendation.findFirst({
    where: { name: body.name },
  });
  return id;
}

async function getScoreRecomendation() {
  const body = await generateFactory.createRandomRecomendation();
  await agent.post(`/recommendations`).send(body);
  const { score } = await prisma.recommendation.findFirst({
    where: { name: body.name },
  });
  return score;
}

// async function getIdRecomendation() {
//   const body = await generateFactory.createRandomRecomendation();
//     const result = await agent.get(`/recommendations`).send(body);

// }

export const getDataFactory = {
  getIdRecomendation,
  getScoreRecomendation,
};

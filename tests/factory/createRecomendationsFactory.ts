import { prisma } from "../../src/database";
import { faker } from "@faker-js/faker";

async function createRandomRecomendation() {
  return {
    name: faker.lorem.words(3),
    youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
  };
}

async function createRandomRecomendationAndPost() {
  const randomRecommendation = {
    name: faker.lorem.words(3),
    youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
  };
  await prisma.recommendation.create({ data: randomRecommendation });
}

async function createBadRecomendation() {
  return {
    name: faker.lorem.words(3),
    youtubeLink: "asdfdsf",
  };
}

async function getAllRecommendations() {
  const recommendations = await prisma.recommendation.findMany();
  const randomId = Math.floor(Math.random() * (recommendations.length - 1));
  const randomRecomendation = recommendations[randomId];
  return randomRecomendation;
}

async function scoreLessTen() {
  const recommendations = await prisma.recommendation.findMany({
    where: { score: { lte: 10 } },
  });
  const randomId = Math.floor(Math.random() * (recommendations.length - 1));
  const randomRecomendation = recommendations[randomId];
  return randomRecomendation;
}
async function scoreGreaterTen() {
  const recommendations = await prisma.recommendation.findMany({
    where: { score: { gt: 10 } },
  });
  const randomId = Math.floor(Math.random() * (recommendations.length - 1));
  const randomRecomendation = recommendations[randomId];
  return randomRecomendation;
}

export const generateFactory = {
  createRandomRecomendation,
  createBadRecomendation,
  createRandomRecomendationAndPost,
};

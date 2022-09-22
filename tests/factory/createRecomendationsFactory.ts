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

export const generateFactory = {
  createRandomRecomendation,
  createBadRecomendation,
  createRandomRecomendationAndPost,
};

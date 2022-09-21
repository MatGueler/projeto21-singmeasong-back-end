import { prisma } from "../../src/database";

async function createRandomRecomendation() {
  return {
    name: "Falamansa - Xote dos Milagres",
    youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
  };
}

async function createBadRecomendation() {
  return {
    name: "Falamansa - Xote dos Milagres",
    youtubeLink: "asdfdsf",
  };
}

async function createRandomicId() {
  const number = Math.random();

  if (number <= 0.7) {
    let id = await scoreGreaterTen();
    if (id) {
      id = await scoreLessTen();
      if (id) {
        return id;
      }
    }
  } else {
    let id = await scoreLessTen();
    if (id) {
      id = await scoreGreaterTen();
      if (id) {
        return id;
      }
    }
  }
  const id = await getAllRecommendations();
  return id;
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
  createRandomicId,
};

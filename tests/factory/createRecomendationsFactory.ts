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

export const generateFactory = {
  createRandomRecomendation,
  createBadRecomendation,
};

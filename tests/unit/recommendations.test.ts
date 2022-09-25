import dotenv from "dotenv";
import { recommendationService } from "../../src/services/recommendationsService";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";

dotenv.config();

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

//  DONE => TESTE 1
describe("Create a new recommendation", () => {
  it("Create a new recomendation", async () => {
    const CreateRecommendationData = {
      name: "string",
      youtubeLink: "https://www.youtube.com/watch?v=lVTsBkLiTck",
    };

    // * Mock search recommendations by name
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {});

    // * Mock the function that create new recommendation on database
    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {
        return CreateRecommendationData;
      });

    await recommendationService.insert(CreateRecommendationData);

    // * Expected that all mocks are called
    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.create).toBeCalled();
  });

  it("Doesent create a repeated recomendation", async () => {
    const CreateRecommendationData = {
      name: "string",
      youtubeLink: "https://www.youtube.com/watch?v=lVTsBkLiTck",
    };

    // * Mock search recommendations by name
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {
        return CreateRecommendationData;
      });

    // * Mock the function that create new recommendation on database
    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {
        return CreateRecommendationData;
      });

    const promise = recommendationService.insert(CreateRecommendationData);

    //  * Expected that second mock dont be called and exist conflict error
    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.create).not.toBeCalled();
    expect(promise).rejects.toEqual({
      type: "conflict",
      message: "Recommendations names must be unique",
    });
  });
});

//  DONE => TESTE 2 E 3
describe("Modify recommendation score", () => {
  it("Increase a score at this recommendation", async () => {
    const CreateRecommendationData = {
      name: "string",
      youtubeLink: "https://www.youtube.com/watch?v=lVTsBkLiTck",
      score: 5,
    };

    const id: number = 1;

    // * Mock search recommendations by id
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return { ...CreateRecommendationData, id };
      });

    // * Mock the function that increase score about this recommendation
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return { ...CreateRecommendationData, id };
      });

    await recommendationService.upvote(id);

    // * Expected that all mocks are called
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });

  it("Decrease the recommendation score", async () => {
    const CreateRecommendationData = {
      name: "string",
      youtubeLink: "https://www.youtube.com/watch?v=lVTsBkLiTck",
      score: 5,
    };

    const id: number = 1;

    // * Mock search recommendations by id
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return { ...CreateRecommendationData, id };
      });

    // * Mock to decrease recommendation score
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return CreateRecommendationData;
      });

    // * Mock the function that remove recommendation with score less than -5
    jest
      .spyOn(recommendationRepository, "remove")
      .mockImplementationOnce((): any => {});

    await recommendationService.downvote(id);

    // * Expected that all mocks are called and one mock not to be called
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
    expect(recommendationRepository.remove).not.toBeCalled();
  });

  it("Remove recommendation with score less than -5", async () => {
    const CreateRecommendationData = {
      name: "string",
      youtubeLink: "https://www.youtube.com/watch?v=lVTsBkLiTck",
      score: Number(-10),
    };

    const id: number = 1;

    // * Mock search recommendations by id
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return { ...CreateRecommendationData, id };
      });

    // * Mock to decrease recommendation score
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return CreateRecommendationData;
      });

    // * Mock the function that remove recommendation with score less than -5
    jest
      .spyOn(recommendationRepository, "remove")
      .mockImplementationOnce((): any => {});

    await recommendationService.downvote(id);

    // * Expected that all mocks are called
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
    expect(recommendationRepository.remove).toBeCalled();
  });

  it("Recommendation not found by id", async () => {
    const id: number = 1;

    // * Mock search recommendations by name
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {});

    // * Mock the function that create new recommendation on database
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {});

    const promise = recommendationService.upvote(id);

    //  * Expected that second mock dont be called and exist conflict error
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).not.toBeCalled();
    expect(promise).rejects.toEqual({
      type: "not_found",
      message: "",
    });
  });
});

//   DONE => TESTE 4
describe("Get a randomic recommendation", () => {
  it("Get randomic recommendation with filter score", async () => {
    const CreateRecommendationData = {
      id: 5,
      name: "string",
      youtubeLink: "https://www.youtube.com/watch?v=lVTsBkLiTck",
      score: 5,
    };

    // * Mock search all recommendations
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return [CreateRecommendationData];
      });

    await recommendationService.getRandom();

    // * Expected that all mocks are called
    expect(recommendationRepository.findAll).toBeCalled();
  });

  it("Get randomic recommendation without filter", async () => {
    const CreateRecommendationData = {
      id: 5,
      name: "string",
      youtubeLink: "https://www.youtube.com/watch?v=lVTsBkLiTck",
      score: 5,
    };

    // * Mock search all recommendations and not found with anyone filter
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return [];
      });

    // * Mock search all recommendations
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return [CreateRecommendationData];
      });

    await recommendationService.getRandom();

    // * Expected that mocks is called 2 times
    expect(recommendationRepository.findAll).toHaveBeenCalledTimes(2);
  });

  it("Get error not_found to randomic recommendation", async () => {
    // * Mock search all recommendations
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementation((): any => {
        return [];
      });

    const promise = recommendationService.getRandom();

    // * Expected that all mocks are called
    expect(recommendationRepository.findAll).toBeCalled();
    expect(promise).rejects.toEqual({
      type: "not_found",
      message: "",
    });
  });
});

//   DONE => TESTE 5
describe("Get top recommendation", () => {
  it("Get top recommendation by score score", async () => {
    const amount = 5;
    // * Mock search all recommendations
    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockImplementationOnce((): any => {});

    await recommendationService.getTop(amount);

    // * Expected that all mocks are called
    expect(recommendationRepository.getAmountByScore).toBeCalled();
  });
});

//   DONE => TESTE 6
describe("Get all recommendations", () => {
  it("Get top recommendation by score score", async () => {
    const amount = 5;
    // * Mock search all recommendations
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {});

    await recommendationService.get();

    // * Expected that all mocks are called
    expect(recommendationRepository.findAll).toBeCalled();
  });
});

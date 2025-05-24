import Stage from "../stage";

describe("Stage tests", () => {
  test("test Stage basics", () => {
    const stage = new Stage(
      "stage",
      {
        title: "Test Stage",
        description: "This is a test stage.",
        parameters: [
          { a: 6, b: 7 },
          { combo: "=a*b" },
        ],
        preamble: {
          content: "Welcome to the test stage.",
          confirm: "Continue",
        },
        resolution: { 
          announce: "=~ You rolled a ${combo}.",
          wait: { duration: "=a + b" },
          next: "nextStage" 
        },
      },
      null,
    );
    
    expect(stage.value).toEqual({
      title: "Test Stage",
      description: "This is a test stage.",
      preamble: {
        content: "Welcome to the test stage.",
        confirm: "Continue",
      },
      resolution: {
        announce: "You rolled a 42.",
        wait: { duration: 13 },
        next: "nextStage",
      },
    });
  });
});
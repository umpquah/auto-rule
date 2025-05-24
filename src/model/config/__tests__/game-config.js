import { initial } from "lodash";
import GameConfig from "../game-config";

describe("GameConfig tests", () => {
  test("test GameConfig validation", () => {
    expect(() => new GameConfig({
      stages: {
        a: {},
        b: {}
      },
    })).toThrow("<top>: missing required 'initialStage' entry");

    expect(() => new GameConfig({
      initialStage: "a",
    })).toThrow("<top>: missing required 'stages' entry");

    expect(() => new GameConfig({
      initialStage: "x",
      stages: {
        a: {},
        b: {},
      },
    })).toThrow("<top>: initial stage 'x' not found in stages");

    expect(() => new GameConfig({
      initialStage: "a",
      stages: {
        a: {},
        b: {},
      },
    })).toThrow("stages.a: missing required 'title' entry");
  });
});
import { Entity } from "../entity";
import { GlobalScope } from "../scope"
import { Wait } from "../config";

describe("wait tests", () => {
  let globalScope;
  let stage = new Entity("stageA", null);
  beforeEach(() => {
    globalScope = new GlobalScope();
  });
  
  test("test wait specs", () => {
    const wait = new Wait(
      "wait",
      {
        duration: 99,
        hidden: true,
      },
      stage,
      globalScope,
    );
    expect(wait.key).toBe("stageA.wait");
    expect(wait.value).toEqual(
      {
        duration: 99,
        hidden: true,
      }
    );
  });

  test("test wait bad specs", () => {
    expect(() => {
      new Wait(
        "wait",
        { hidden: false},
        stage,
        globalScope
      );
    }).toThrow("missing required 'duration' entry");
  });
});
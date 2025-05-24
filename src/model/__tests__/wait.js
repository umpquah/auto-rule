import { Entity } from "../entity";
import Scope from "../scope"
import { Wait } from "../config";

describe("wait tests", () => {
  test("test wait specs", () => {
    const wait = new Wait(
      "wait",
      {
        duration: 99,
        hidden: true,
      },
      null,
      Scope.globalScope,
    );
    expect(wait.key).toBe("<top>.wait");
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
        null,
        Scope.globalScope
      );
    }).toThrow("missing required 'duration' entry");
  });
});
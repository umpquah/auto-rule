import Resolution from "../resolution";
import Scope from "../../scope/scope"

describe("Resolution tests", () => {
  test("test Resolution validation", () => {
    expect(() => new Resolution(
      "resolution",
      {
          action: "Do something",
          wait: { duration: 5 },
      },
      null,
      Scope.globalScope,
    )).toThrow("resolution: missing required 'next' entry");

    expect(() => new Resolution(
      "resolution",
      {
          action: "Do something",
          wait: { duration: 5 },
          next: "next",
      },
      null,
      Scope.globalScope,
    )).toThrow("resolution: action and wait cannot be used together");

    expect(() => new Resolution(
      "resolution",
      {
          wait: { hidden: true },
          next: "next",
      },
      null,
      Scope.globalScope,
    )).toThrow("resolution.wait: missing required 'duration' entry");

    expect(() => new Resolution(
      "resolution",
      {
          wait: { hidden: true },
          next: "next",
      },
      null,
      Scope.globalScope,
    )).toThrow("resolution.wait: missing required 'duration' entry");

    expect(() => new Resolution(
      "resolution",
      {
          next: "next",
      },
      null,
      Scope.globalScope,
    )).toThrow("resolution: must specify at least one of announce, action or wait");

    expect(() => new Resolution(
      "resolution",
      {
          next: "next",
          cake: "yum",
      },
      null,
      Scope.globalScope,
    )).toThrow("resolution: 'cake' not allowed here");
  });

  test("test Resolution structure", () => {
    const r = new Resolution(
      "resolution",
      {
          next: "next",
          announce: "Announce something",
          action: { content: "Do something", confirm: "Doing it"},
          clearBeforeNext: true,
      },
      null,
      Scope.globalScope,
    );
    expect(r.value).toEqual(
      {
          next: "next",
          announce: "Announce something",
          action: { content: "Do something", confirm: "Doing it"},
          clearBeforeNext: true,
      }
    );
  });
});
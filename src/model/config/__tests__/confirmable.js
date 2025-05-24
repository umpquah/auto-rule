import Confirmable from "../confirmable";
import Scope from "../../scope/scope";

describe("Confirmable tests", () => {
  test("test Confirmable specs", () => {
    const confirmable = new Confirmable(
      "action",
      {
        content: "Are you sure?",
        confirm: "yes",
      },
        null,
        Scope.globalScope
      );
    expect(confirmable.key).toBe("<top>.action");
    expect(confirmable.value).toEqual({
      content: "Are you sure?",
      confirm: "yes",
    });

    const confirmable2 = new Confirmable(
      "prepare",
      "Get ready",
      null,
      Scope.globalScope,
    );
    expect(confirmable2.key).toBe("<top>.prepare");
    expect(confirmable2.value).toEqual({
      content: "Get ready",
    });
  });

  test("test Confirmable bad specs", () => {
    expect(() => {
      new Confirmable(
        "action",
        { confirm: "Ok"},
        null,
        Scope.globalScope,
      );
    }).toThrow("action: missing required 'content' entry");

    expect(() => {
      new Confirmable(
        "action",
        { content: "Do the thing", extra: "extra"},
        null,
        Scope.globalScope,
      );
    }).toThrow("action: 'extra' not allowed here");
  });
});
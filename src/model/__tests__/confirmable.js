import { Confirmable } from "../config";
import { Entity } from "../entity";
import Scope from "../scope";

describe("confirmable tests", () => {
  test("test confirmable specs", () => {
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

  test("test confirmable bad specs", () => {
    expect(() => {
      new Confirmable(
        "action",
        { confirm: "Ok"},
        null,
        Scope.globalScope,
      );
    }).toThrow("missing required 'content' entry");

    expect(() => {
      new Confirmable(
        "action",
        { content: "Do the thing", extra: "extra"},
        null,
        Scope.globalScope,
      );
    }).toThrow("'extra' not allowed here");
  });
});
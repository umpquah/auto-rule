import { Confirmable } from "../config";
import { GlobalScope }  from "../scope";
import { Entity } from "../entity";

describe("confirmable tests", () => {
  let globalScope;
  let stage = new Entity("stageA", null);
  beforeEach(() => {
    globalScope = new GlobalScope();
  });
  
  test("test confirmable specs", () => {
    const confirmable = new Confirmable(
      "action",
      {
        content: "Are you sure?",
        confirm: "yes",
      },
        stage,
        globalScope
      );
    expect(confirmable.key).toBe("stageA.action");
    expect(confirmable.value).toEqual({
      content: "Are you sure?",
      confirm: "yes",
    });

    const confirmable2 = new Confirmable(
      "prepare",
      "Get ready",
      stage,
      globalScope,
    );
    expect(confirmable2.key).toBe("stageA.prepare");
    expect(confirmable2.value).toEqual({
      content: "Get ready",
    });
  });

  test("test confirmable bad specs", () => {
    expect(() => {
      new Confirmable(
        "action",
        { confirm: "Ok"},
        stage,
        globalScope
      );
    }).toThrow("missing required 'content' entry");

    expect(() => {
      new Confirmable(
        "action",
        { content: "Do the thing", extra: "extra"},
        stage,
        globalScope
      );
    }).toThrow("'extra' not allowed here");
  });
});
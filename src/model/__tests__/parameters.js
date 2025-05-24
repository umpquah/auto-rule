import AppError from "../error";
import { Entity, NameDeclarations } from "../entity";
import { GlobalScope } from "../scope"

describe("parameter tests", () => {
  let globalScope;
  let stage = new Entity("stageA", null);

  beforeEach(() => {
    globalScope = new GlobalScope();
  });

  test("test parameter group", () => {
    const params = new NameDeclarations(
      "parameters",
      {
        a: 42,
        b: "=range(17, 17)",
        c: "=select(['cake'])"
      },
      stage,
      globalScope,
    );
    expect(params.key).toBe("stageA.parameters");
    const vars = params._components;
    expect(vars["a"].key).toBe("stageA.parameters.a");
    expect(vars["b"].key).toBe("stageA.parameters.b");
    expect(vars["c"].key).toBe("stageA.parameters.c");
    expect(vars["a"].value).toBe(42);
    expect(vars["b"].value).toBe(17);
    expect(vars["c"].value).toBe("cake");
    expect(params.value).toEqual({
      a: 42,
      b: 17,
      c: "cake"
    });
  });

  test("test parameters with bad spec", () => {
    const badSpec = () => { return new NameDeclarations("parameters", 1234); };
    expect(badSpec).toThrow(AppError);
  });

  test("test parameter group cannot reference internally", () => {
    const params = new NameDeclarations(
      "parameters",
      {
        a: 42,
        b: "=a * 10",
      },
    stage,
    globalScope,
    );
    expect(() => { return params.value }).toThrow(ReferenceError);
  });

  test("test parameters in list of groups", () => {
    const params = new NameDeclarations(
      "parameters",
      [
        {
          a: 6,
          b: 7,
        },
        {
          c: "= a + b",
          d: "= a * b"
        },
        {
          e: "=a * c",
          f: "=d / a",
        }
      ],
      stage,
      globalScope,
    );
    expect(params.value).toEqual({
      a: 6,
      b: 7,
      c: 13,
      d: 42,
      e: 78,
      f: 7,
    });
    expect(params.value.d).toBe(42);
    expect(params.value.f).toBe(7);
    expect(params._components.a.key).toBe("stageA.parameters.a");
    expect(params._components.f.key).toBe("stageA.parameters.f");
  });

   test("test parameters in list cannot be out of order", () => {
    const params = new NameDeclarations(
      "parameters",
      [
        {
          c: "= a + b",
          d: "= a * b"
        },
        {
          a: 6,
          b: 7,
        },
      ],
      stage,
      globalScope,
    );
    expect(() => params.value.c).toThrow(ReferenceError);
  });
});
  
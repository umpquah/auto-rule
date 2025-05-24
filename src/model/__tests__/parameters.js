import AppError from "../error";
import { NameDeclarations } from "../entity";
import Scope from "../scope"

describe("parameter tests", () => {
  test("test parameter group", () => {
    const params = new NameDeclarations(
      "parameters",
      {
        a: 42,
        b: "=range(17, 17)",
        c: "=select(['cake'])"
      },
      null,
      Scope.globalScope,
    );
    expect(params.key).toBe("<top>.parameters");
    const vars = params._components;
    expect(vars["a"].key).toBe("parameters.a");
    expect(vars["b"].key).toBe("parameters.b");
    expect(vars["c"].key).toBe("parameters.c");
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
      null,
      Scope.globalScope,
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
      null,
      Scope.globalScope,
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
    expect(params._components.a.key).toBe("parameters.a");
    expect(params._components.f.key).toBe("parameters.f");
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
      null,
      Scope.globalScope,
    );
    expect(() => params.value.c).toThrow(ReferenceError);
  });
});
  
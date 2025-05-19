import { Scope } from "../scope/scope";
import AppError from "../error";
import EntityBuilder from "../entity/builder";
import GlobalScope from "../scope/global";


test("test scope", () => {
  const scope = new Scope();
  scope.addEntity("a", 24);
  scope.addEntity("b", 42);
  scope.addEntity("c", 7);
  expect(scope.names).toEqual(new Set(["a", "b", "c"]));
  expect(scope.entities).toEqual(new Set([24, 42, 7]));

  const scope2 = new Scope(scope);
  scope2.addEntity("d", 100);
  expect(scope2.names).toEqual(new Set(["a", "b", "c", "d"]));
  expect(scope2.entities).toEqual(new Set([24, 42, 7, 100]));
  const attemptDuplicate = () => {
    scope.addEntity("a", 100);
  };
  expect(attemptDuplicate).toThrow(AppError)
});

test("test expressions with scopes", () => {
  const s = new GlobalScope();
  const a = EntityBuilder.fromAnnotatedSpec("basePrice", "= 15 + 15");
  s.addEntity("basePrice", a);
  expect(a.value).toBe(30);

  const b = EntityBuilder.fromAnnotatedSpec("tax", "= 0.2 * basePrice");
  expect(() => { return b.value }).toThrow(ReferenceError)
  
  const c = EntityBuilder.fromAnnotatedSpec("tax", "= 0.2 * basePrice", null, s);
  expect(c.value).toBe(6);  

  const d = EntityBuilder.fromAnnotatedSpec("marbles", "= range(1, 5)", null, s);
  for (let i = 0; i < 100; i++) {
    d.refresh();
    expect(d.value).toBeLessThanOrEqual(5);
    expect(d.value).toBeGreaterThanOrEqual(1);
  }
});
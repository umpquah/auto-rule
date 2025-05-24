import { entries } from "lodash";
import { Literal } from "../entity";
import Scope from "./scope";

const _range = (min, max) => {
  if (!(Number.isInteger(min) && Number.isInteger(max)))
    throw new TypeError("must be integers");
  if (max < min)
    throw new TypeError("must be in non-decreasing order");
  return Math.floor(min + Math.random() * (max - min + 1))
}

const _chance = (probability) => {
  if (typeof probability !== "number")
    throw new TypeError("must be a number");
  if (probability < 0 || probability > 1)
    throw new TypeError("must be between 0 and 1");
  return Math.random() < probability;
}

const _select = (options) => {
  if (!Array.isArray(options) || options.length === 0)
    throw new TypeError("must be a non-empty array");
  return options[Math.floor(Math.random() * options.length)];
}

const BUILTINS = {
  "range": _range,
  "chance": _chance,
  "select": _select,
}

export default class GlobalScope extends Scope {
  constructor() {
    super();
    entries(BUILTINS).forEach(([name, fn]) => {
      this.addOne(name, new Literal(name, fn, null));
    });
  }
}
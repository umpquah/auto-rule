import { map } from "lodash";
import Entity from "./base";

export class Literal extends Entity {
  loadSpec(spec) {
    this._value = spec;
  }

  get value() {
    return this._value;
  }
}

export class Expression extends Entity {
  loadSpec(spec) {
    this._fn = new Function(...this.scope.names, "return " + spec + ";"); 
    this._value = undefined;
  }

  _calcValue() {
    return this._fn(...(map([...this.scope.entities], (entity) => entity.value)));
  }

  get value() {
    if (this._value === undefined) {
      this._value = this._calcValue();
    }
    return this._value;
  }

  refresh() {
    this._value = undefined;
  }
}

export class StringExpression extends Expression {
  constructor(name, spec, parent) {
    super(name, "`" + spec + "`", parent);
  }
}

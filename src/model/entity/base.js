import AppError from "../error";
import { Scope } from "../scope";

export default class Entity {
  static validators = [];

  constructor(name, spec, parent = null, scope = new Scope()) {
    this.name = name;
    this.parent = parent;
    this.scope = scope;
    if (spec !== undefined) {
      this._validateSpec(spec);
      this._loadSpec(spec);
    }    
  }

  get value() {
    return undefined;
  }

  get _keyPath() {
    const { parent } = this;
    if (parent) {
      if (this.name)
        return [...parent._keyPath, this.name];
      else
        return [...parent._keyPath];
    } else if (this.name) {
      return [this.name];
    } else {
      throw new Error("Cannot have an entity with no name and no parent");
    }
  }

  get key() {
    const { _keyPath } = this;
    const prefix = _keyPath.length > 1 ? "" : "<top>.";
    return prefix + _keyPath.join(".");
  }

  _validateSpec(spec) {
    this.constructor.validators.forEach((validator) => {
      const result = validator(spec);
      if (result !== true) {
          throw new AppError(this.key, result, "Specification");
      }
    });
  }

  _loadSpec(spec) { }

  refresh() { }
}

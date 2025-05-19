import { Scope } from "../scope/scope";

export default class Entity {
  // An entity is a name with an associated value.
  // The value may be static or dynamic.
  // An entity has at most one parent entity
  constructor(name, spec, parent = null, scope = new Scope()) {
    this.name = name;
    this.parent = parent;
    this.scope = scope;
    this.loadSpec(spec);
  }

  get value() {
    return undefined;
  }

  get _keyPath() {
    const { parent } = this;
    if (parent) {
      return [...parent._keyPath, this.name];
    }
    return [this.name];
  }

  get key() {
    const { _keyPath } = this;
    const prefix = _keyPath.length > 1 ? "" : "<top>.";
    return prefix + _keyPath.join(".");
  }

  loadSpec(spec) { }

  refresh() { }
}

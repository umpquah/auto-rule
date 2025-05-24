import { mapValues, values } from "lodash";
import { Entity, EntityBuilder } from ".";

export default class NestedEntity extends Entity {
  static validators = [
    (spec) => (typeof spec === "object") || "format must be {...}",
  ];

  _loadSpec(spec) {
    this._components = mapValues(spec, (value, key) => 
      EntityBuilder.fromAnnotatedSpec(key, value, this, this.scope)
    );
  }   

  get value() {
    return mapValues(this._components, (component) => component.value);
  }

  refresh() {
    values(this._components).forEach((component) => component.refresh());
  }
}
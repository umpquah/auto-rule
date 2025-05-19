import Entity from "./base";
import EntityBuilder from "./builder";
import AppError from "../error";
import { mapValues, values } from "lodash";

export default class NestedEntity extends Entity {
  loadSpec(spec) {
    if (!(typeof spec === "object")) {
      throw new AppError(this.key, "Nested entity spec must be an object");
    }
    this._components = mapValues(spec, (value, key) => 
      EntityBuilder.fromAnnotatedSpec(key, value, this)
    );
  }   

  get value() {
    return mapValues(this._components, (component) => component.value);
  }

  refresh() {
    values(this._components).forEach((component) => component.refresh());
  }
}
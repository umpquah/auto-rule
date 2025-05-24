import { entries } from "lodash";
import AppError from "../error";
import { EntityBuilder, NestedEntity } from ".";

export default class StructuredEntity extends NestedEntity {
  static requiredProps = [];
  static optionalProps = [];
  static get allProps() { return this.requiredProps.concat(this.optionalProps); }
  static subEntityTypes = {};

  _validateSpec(spec) {
    const { allProps, requiredProps } = this.constructor;
    if (typeof spec !== "object") {
        throw new AppError(this.key, "format must be { ... }");
    }
    if (allProps.length === 0)
        return;
    requiredProps.forEach((prop) => {
        if (!(prop in spec))
            throw new AppError(this.key, `missing required '${prop}' entry`, "Specification");
    });
    for (const prop in spec) {
        if (!allProps.includes(prop)) {
            throw new AppError(this.key, `'${prop}' not allowed here`,  "Specification");
        }
    }
  }

  _loadSpec(spec) {
    this._components = {};
    const { subEntityTypes } = this.constructor;
    entries(spec).forEach(([subKey, subSpec]) => {
      const entityClass = subEntityTypes[subKey];
      const subEntity = 
        entityClass 
        ? new entityClass(subKey, subSpec, this, this.scope)
        : EntityBuilder.fromAnnotatedSpec(subKey, subSpec, this, this.scope); 
      this._components[subKey] = subEntity;
    });
  }
}
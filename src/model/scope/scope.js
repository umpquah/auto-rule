import AppError from "../error";

export class Scope {
  constructor(enclosingScope = null) {
    this.enclosingScope = enclosingScope;
    this._entityMap = new Map();
  }

  addEntity(name, entity) {
    if (this.names.has(name)) 
      throw new AppError(entity.key, `Name '${name}' already used in this scope`, "Scope");
    this._entityMap.set(name, entity);
  }

  get innermostNames() {
    return new Set(this._entityMap.keys());
  }

  get innermostEntities() {
    return new Set(this._entityMap.values());
  }

  get names() {
    return this.enclosingScope
      ? new Set([...this.innermostNames, ...this.enclosingScope.names])
      : this.innermostNames;
  }

  get entities() {
    return this.enclosingScope
      ? new Set([...this.innermostEntities, ...this.enclosingScope.entities]) 
      : this.innermostEntities;
  }
}

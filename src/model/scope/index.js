import { entries } from "lodash";
import AppError from "../error";
import BUILTINS from "./builtins";
import { Literal } from "../entity";

export default class Scope {
  constructor(enclosingScope = null) {
    this._enclosingScope = enclosingScope;
    this._entityMap = new Map();
  }

  addOne(name, entity) {
    if (this.names.has(name)) 
      throw new AppError(entity.key, `Name '${name}' already used`, "Scope");
    this._entityMap.set(name, entity);
  }

  add(entityMap) {
    Object.entries(entityMap).forEach(([name, entity]) => {
      this.addOne(name, entity);
    });
  }

  get innermostNames() {
    return new Set(this._entityMap.keys());
  }

  get innermostEntities() {
    return new Set(this._entityMap.values());
  }

  get names() {
    return this._enclosingScope
      ? new Set([...this.innermostNames, ...this._enclosingScope.names])
      : this.innermostNames;
  }

  get entities() {
    return this._enclosingScope
      ? new Set([...this.innermostEntities, ...this._enclosingScope.entities]) 
      : this.innermostEntities;
  }

  createInnerScope() {
    return new Scope(this);
  }

  static _globalScope;

  static get globalScope() {
    if(!Scope._globalScope) {
      Scope._globalScope = new Scope();
      entries(BUILTINS).forEach(([name, fn]) => {
        Scope._globalScope.addOne(name, new Literal(name, fn, null));
      });
    }
    return Scope._globalScope;
  }
}

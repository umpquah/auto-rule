import { assign, entries, keys, values } from "lodash";
import AppError from "../error";


/**
 * Generic environment that tracks binding of names to objects,
 * providing a "fork" functionality to spin off a new environment
 * from an old one and basic validation.
 */
export default class Environment {
    constructor(enclosingEnvironment = null) {
      if (enclosingEnvironment)
        this.bindings = {...enclosingEnvironment.bindings};
      else
        this.bindings = {};
    }

    get names() {
        return keys(this.bindings);
    }

    get values() {
        return this.names.map(
            (name) => this.bindings[name].value
        );
    }

    _validateName(parent, name) {
        // TODO: Check against reserved words also
        const previous = this.bindings[name];
        if (previous) {
            throw new AppError(
                parent.key, `'${name}' already declared as ${previous.key}`, "Naming"
            );
        }
    }

    add(parent, group) {
        if (!(typeof group === "object"))
            throw new AppError("<internal>", "Environment.add() requires an object", "Internal");
        let groupBindings = {};
        entries(group).forEach(([name, object]) => {
            this._validateName(parent, name);
            groupBindings[name] = object;
            // if (typeof object["wasAddedToEnvironment"] === "function") {
            //     object.wasAddedToEnvironment(this);
            // }
        });
        assign(this.bindings, groupBindings);
        return groupBindings;
    }

    applyToAll(func) {
        values(this.bindings).forEach((obj) => { func(obj) });
    }
}

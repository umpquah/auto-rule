import { assign, entries, keys, values } from "lodash";
import AppError from "./error";


/**
 * Generic environment that tracks binding of names to objects,
 * providing a "fork" functionality to spin off a new environment
 * from an old one and basic validation.
 */
export default class Environment {
    constructor(bindings = {}) {
        this.bindings = bindings;
    }

    get names() {
        return keys(this.bindings);
    }

    get objects() {
        return values(this.bindings);
    }

    fork() {
        return new Environment({...this.bindings});
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

    add(parent, groupList) {
        if (!Array.isArray(groupList))
            throw new AppError("Internal", "Environment.add() requires array");
        let addedBindings = {};
        groupList.forEach((group) => {
            let groupBindings = {};
            entries(group).forEach(([name, object]) => {
                this._validateName(parent, name);
                groupBindings[name] = object;
                if (object.wasAddedToEnvironment)
                    object.wasAddedToEnvironment(this);
            });
            assign(this.bindings, groupBindings);
            assign(addedBindings, groupBindings);
        });
        return addedBindings;
    }

    applyToAll(methodName, ...args) {
        this.objects.forEach((object) => object[methodName](...args));
    }
}

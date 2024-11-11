import { assign, entries, keys, values } from "lodash";
import AppError from "../app-error";

export default class Environment {
    constructor(bindings = {}) {
        this.bindings = bindings;
    }

    get names() {
        return keys(this.bindings);
    }

    get variables() {
        return values(this.bindings);
    }

    fork() {
        return new Environment({...this.bindings});
    }

    _validateName(parent, name) {
        const previous = this.bindings[name];
        if (previous) {
            throw new AppError(
                "Name",
                `'${name}' already declared as ${previous.key}`,
                parent.key,
            );
        }
    }

    add(parent, groupList) {
        if (!Array.isArray(groupList))
            throw new AppError("Programming", "Environment.add() requires array");
        let addedBindings = {};
        groupList.forEach((variableGroup) => {
            let groupBindings = {};
            entries(variableGroup).forEach(([name, variable]) => {
                this._validateName(parent, name);
                groupBindings[name] = variable;
                variable.addedToEnvironment();
            });
            assign(this.bindings, groupBindings);
            assign(addedBindings, groupBindings);
        });
        return addedBindings;
    }

    refresh() {
        this.variables.forEach((variable) => { variable.refresh() });
    }
}

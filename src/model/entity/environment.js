import Variable from "../variable";
import AppError from "../app-error";

export default class Environment {
    constructor() {
        this.bindings = {};
    }

    get names() {
        return Object.keys(this.bindings);
    }

    get variables() {
        return Object.values(this.bindings);
    }

    fork() {
        const forked = new Environment(this.parent);
        forked.bindings = {...this.bindings};
        return forked;
    }

    _validateName(parent, name) {
        const previous = this.bindings[name];
        if (previous) {
            throw new AppError(
                "Variable",
                `'${name}' already declared as ${previous.key}, ` +
                `re-declared within ${parent.key}`
            );
        }
    }

    _addGroup(parent, groupSpec) {
        let newBindings = {}
        Object.entries(groupSpec).forEach(([name, spec]) => {
            this._validateName(parent, name);
            newBindings[name] = new Variable(parent, name, spec);
        });
        Object.assign(this.bindings, newBindings);
        return newBindings;
    }

    _addGroupList(parent, groupListSpec) {
        let newBindings = {};
        groupListSpec.forEach((groupSpec) => {
            const groupBindings = this._addGroup(parent, groupSpec);
            Object.assign(newBindings, groupBindings);
        });
        return newBindings;
    }

    add(parent, spec) {
        if (Array.isArray(spec)) {
            return this._addGroupList(parent, spec);
        } else if (typeof spec === "object") {
            return this._addGroup(parent, spec);
        } else {
            throw new AppError("Programming", "add() requires array or object");
        }
    }

    refresh() {
        this.variables.forEach((variable) => { variable.refresh() });
    }
}

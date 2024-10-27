import { VariableError } from "../error";

export class Environment {
    constructor() {
        this.bindings = {};
    }

    add(variable) {
        const { name } = variable;
        if (name in this.bindings) {
            const previous = this.bindings[name];
            throw new VariableError(
                `'${name}' already declared as ${previous.key}, ` +
                `re-declared as ${variable.key}`
            )
        }
        this.bindings[name] = variable;
    }
}
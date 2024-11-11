import { keys } from "lodash";
import VariableBase from "../base";

export default class Expression extends VariableBase {
    static typeKeyword = "expr";
    static validators = [
        [(spec) => (typeof spec === "string"), "must be a string"],
    ];

    _loadSpec(spec) {
        this.expr = spec;
    }

    addedToEnvironment() { 
        // shallow copy from bindings so only prior declarations are visible
        this.bindings = {...this.environment.bindings };
        this.names = keys(this.bindings);
        /* eslint-disable-next-line no-new-func */
        this._fn = new Function(...this.names, "return " + this.expr + ";"); 
    }

    get value() {
        const values = this.names.map(
            (name) => this.bindings[name].value
        );
        return this._fn(...values);
    }
}

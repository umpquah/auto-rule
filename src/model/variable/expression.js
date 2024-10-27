import { Variable } from "./base";

export class Expression extends Variable {
    static validators = [
        [(spec) => (typeof spec === "string"), "must be a string"],
    ];

    constructor(key, spec, environment) {
        super(key, spec);
        const { bindings } = environment;
        this._bindings = bindings
        const names = Object.keys(bindings);
        /* eslint-disable-next-line no-new-func */
        this._fn = new Function(...names, "return " + spec + ";"); 
    }

    get value() {
        const values = Object.values(this._bindings).map((v) => v.value);
        return this._fn(...values);
    }
}

export class StringExpression extends Expression {
    constructor(key, spec, environment) {
        super(key, "`" + spec + "`", environment);
    }
}
import { Variable } from "./base";

export class Select extends Variable {
    static validators = [
        [(spec) => Array.isArray(spec) && spec.length > 0, "must be a non-empty array"],
    ];

    _loadSpec(spec) {
        this.options = spec;
    }

    refresh() {
        this._value = this.options[Math.floor(Math.random() * this.options.length)];
    }
}

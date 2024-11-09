import VariableBase from "./base";

export default class Range extends VariableBase {
    static typeKeyword = "range";
    static validators = [
        [(spec) => Array.isArray(spec) && spec.length === 2, "must be two-element array"],
        [([min, max]) => Number.isInteger(min) && Number.isInteger(max), "endpoints must be integers"],
        [([min, max]) => max >= min, "endpoints must be in non-decreasing order"],
    ];

    _loadSpec(spec) {
        [this.min, this.max] = spec;
    }

    refresh() {
        const { min, max } = this;
        this._value = Math.floor(min + Math.random() * (max - min + 1))
    }
}

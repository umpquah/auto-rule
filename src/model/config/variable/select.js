import VariableBase from "./base";

export default class Select extends VariableBase {
    static typeKeyword = "select";
    static validators = [
        (spec) => (Array.isArray(spec) && spec.length > 0) || "must be a non-empty array",
    ];

    _loadSpec(spec) {
        this.options = spec;
    }

    refresh() {
        this._value = this.options[Math.floor(Math.random() * this.options.length)];
    }
}

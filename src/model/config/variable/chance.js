import VariableBase from "./base";

export default class Chance extends VariableBase {
    static typeKeyword = "chance";
    static validators = [
        (spec) => (typeof spec === "number") || "must be a number",
        (spec) => (spec >= 0 && spec <= 1) || "must be between 0 and 1",
    ];

    _loadSpec(spec) {
        this.probability = spec;
    }

    refresh() {
        this._value = (Math.random() < this.probability);
    }
}

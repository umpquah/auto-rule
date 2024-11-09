import VariableBase from "./base";

export default class Literal extends VariableBase {
    static typeKeyword = "literal";

    _loadSpec(spec) {
        this._value = spec;
    }
}

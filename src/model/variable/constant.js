import { Variable } from "./base";

export class Constant extends Variable {
    _loadSpec(spec) {
        this._value = spec;
    }
}

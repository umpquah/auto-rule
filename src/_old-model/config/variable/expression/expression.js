import { keys } from "lodash";
import VariableBase from "../base";

export default class Expression extends VariableBase {
    _loadSpec(spec) {
        this._fn = new Function(...this.environment.names, "return " + spec + ";");
    }

    // wasAddedToEnvironment(environment) { 
    //     // shallow copy from bindings so only prior declarations are visible
    //     this.bindings = { ...environment.bindings };
    //     this.names = keys(this.bindings);
    //     /* eslint-disable-next-line no-new-func */
    //     this._fn = new Function(...this.names, "return " + this.expr + ";"); 
    // }

    get value() {
        return this._fn(...this.environment.values);
    }
}

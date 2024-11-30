import ConfigNode from "../node";

export default class VariableBase extends ConfigNode {
    static validators = [];
    static typeKeyword = "";

    constructor(parent, name, spec) {
        super(parent, name, spec);
        console.debug(`${this.key} created`);
        this.refresh();
    }

    _loadSpec(spec) {
        this._value = undefined;
    }
    
    refresh() { }

    wasAddedToEnvironment(environment) { }
    
    get value() {
        return this._value;
    }
}

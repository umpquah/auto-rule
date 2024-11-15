import Entity from "../entity";

export default class VariableBase extends Entity {
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

    addedToEnvironment() { }
    
    get value() {
        return this._value;
    }

    toString() {
        return `[${this.name}: ${JSON.stringify(this.value)}]`;
    }
};

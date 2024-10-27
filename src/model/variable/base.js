import { VariableError } from "../error";

// Abstract base class for all variable types
export class Variable {
    static validators = [];

    constructor(key, spec) {
        this.name = key.split(".").slice(-1)[0];
        this._key = key;
        if (spec) {
            this._validateSpec(spec);
            this._loadSpec(spec);
        }
        this.refresh();
        console.debug(`${this.nameAndType} created`);
    }

    _validateSpec(spec) {
        const { validators } = this.constructor;
        validators.forEach(([validator, errorMessage]) => {
            if (!validator(spec))
                throw new VariableError(errorMessage);
        });
    }
    
    _loadSpec(spec) {
        this._value = undefined;
    }
    
    refresh() {}
    
    get key() {
        return (
            this._key.match(/\./g)?.length > 0 // any dots in key?
            ? this._key
            : "[toplevel]" + (this._key ? `.${this._key}` : "")
        );
    } 

    get nameAndType() {
        return `${this.key}(${this.constructor.name})`;
    }

    get value() {
        return this._value;
    }

    toString() {
        return `[${this.name}: ${JSON.stringify(this.value)}]`;
    }

};
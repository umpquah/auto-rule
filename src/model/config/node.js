
import AppError from "../error";
import Environment from "../environment";

// Base node type for configuration graph
export default class ConfigNode {
    static validators = [];

    constructor(
        parent,
        name,
        spec, 
        { forkEnvironment = false, intermediateKey = "" } = {},
    ) {
        this.name = name;
        const parentKeys = parent?._keyPath ?? [];
        this._keyPath = [...parentKeys];
        if (intermediateKey)
            this._keyPath.push(intermediateKey);
        if (name) {
            this._keyPath.push(name)
        }
        if (!parent) {
            this.environment = new Environment();
        }
        else {
            const parentEnvironment = parent.environment;
            this.environment = forkEnvironment ? parentEnvironment.fork() : parentEnvironment;
        }
        if (spec !== undefined) {
            this._validateSpec(spec);
            this._loadSpec(spec);
        }
    }

    get key() {
        const { _keyPath } = this;
        const path = _keyPath.length <= 1 ? ["<top>", ..._keyPath] : _keyPath;
        return path.join(".");
    }

    get value() { return undefined; }

    _validateSpec(spec) {
        const { validators } = this.constructor;
        validators.forEach((validator) => {
            const result = validator(spec);
            if (result !== true) {
                throw new AppError(this.key, result, "Specification");
            }
        });
    }

    _loadSpec(spec) { }    
}
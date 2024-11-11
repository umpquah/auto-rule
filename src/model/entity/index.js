import AppError from "../app-error";
import Environment from "./environment";

export default class Entity {
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
            const environment = parent.environment;
            this.environment = forkEnvironment ? environment.fork() : environment;
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

    _validateSpec(spec) {
        this.constructor.validators.forEach(([validator, errorMessage]) => {
            if (!validator(spec))
                throw new AppError("Specification", errorMessage, this.key);
        });
    }

    _loadSpec(spec) { } 
}
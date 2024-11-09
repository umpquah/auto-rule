import AppError from "../app-error";
import Environment from "./environment";

export default class Entity {
    static validators = [];

    constructor(parent, name = "<top>", spec, forkEnvironment = false) {
        this.name = name;
        const parentKey = parent?.key;
        this.key = (parentKey ? `${parentKey}.` : "") + name;
        if (!parent) {
            console.debug(`[ENTITY] ${this.key}: environment created `);
            this.environment = new Environment();
        }
        else {
            const phrase = forkEnvironment ? "forked from" : "shared from";
            console.debug(`[ENTITY] ${this.key}: environment ${phrase} ${parentKey}`);
            const environment = parent.environment;
            this.environment = forkEnvironment ? environment.fork() : environment;
        }
        if (spec) {
            this._validateSpec(spec);
            this._loadSpec(spec);
        }
    }

    _validateSpec(spec) {
        this.constructor.validators.forEach(([validator, errorMessage]) => {
            if (!validator(spec))
                throw new AppError("Validation", errorMessage, this.key);
        });
    }

    _loadSpec(spec) { } 
}
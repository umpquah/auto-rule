export class ConfigError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConfigError";
    }
}

export class VariableError extends Error {
    constructor(message) {
        super(message);
        this.name = "VariableError";
    }
}


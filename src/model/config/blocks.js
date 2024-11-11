import { capitalize } from "lodash";
import ConfigBase from "./base";
import Variables from "../variables";
import AppError from "../app-error";

class Block extends ConfigBase {
    _loadSpec(spec) {
        this.environment.add(this, Variables.buildFromSpecs(this, spec));
    }
}

export class Basics extends Block {
    static requiredProperties = ["title"];
    static optionalProperties = ["description", "preamble", "preambleConfirm"];
    constructor(parent, spec) {
        super(parent, "", spec);
    }
    _validateSpec(spec) {
        super._validateSpec(spec);
        if ("preambleConfirm" in spec && !("preamble" in spec)) {
            throw new AppError("Specification", "cannot have preambleConfirm without preamble");
        }
    }
}

export class Parameters extends Block {
    constructor(parent, spec) {
        super(parent, "parameters", spec);
    }
}

export class Resolution extends Block {
    static requiredProperties = ["next"];
    static optionalProperties = ["announce", "action", "actionConfirm", "wait", "hideTime", "clearBeforeNext"];
    static coreProperties = ["announce", "action", "wait"];
    constructor(parent, spec) {
        super(parent, "resolution", spec);
    }
    _validateSpec(spec) {
        super._validateSpec(spec);
        const corePresent = Resolution.coreProperties.filter((prop) => (prop in spec));
        if (corePresent.length === 0) {
            throw new AppError(
                "Specification",
                `Must specify at least one of {${Resolution.coreProperties.join(', ')}}`,
                this.key,
            );
        }
        if ("action" in spec && "wait" in spec) {
            throw new AppError("Specification", "cannot have both action and wait", this.key);
        }
        if ("hideTime" in spec && !("wait" in spec)) {
            throw new AppError("Specification", "cannot have hideTime without wait", this.key);
        }
        if ("actionConfirm" in spec && !("action" in spec)) {
            throw new AppError("Specification", "cannot have actionConfirm without action", this.key);
        }
    }
}   


const BUILTINS_SPEC = {
    capitalize: capitalize
}

export class BuiltIns extends Block {
    constructor(parent) {
        super(parent, "<builtins>", BUILTINS_SPEC);
    }
}

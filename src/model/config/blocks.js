import ConfigBase from "./base";

class Block extends ConfigBase {
    _loadSpec(spec) {
        this.environment.add(this, spec);
    }
}

export class Basics extends Block {
    static requiredProperties = ["title"];
    static optionalProperties = ["description", "preamble"];
    constructor(parent, spec) {
        super(parent, "<basics>", spec);
    }
}

export class Parameters extends Block {
    constructor(parent, spec) {
        super(parent, "parameters", spec);
    }
}

export class Resolution extends Block {
    static requiredProperties = ["next"];
    static optionalProperties = ["announce", "action", "wait", "timerHidden"];
    constructor(parent, spec) {
        super(parent, "resolution", spec);
    }
}   

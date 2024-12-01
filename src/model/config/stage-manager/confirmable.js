import ConfigGroup from "../group";

export default class Confirmable extends ConfigGroup {
    static requiredProperties = ["content"];
    static optionalProperties = ["confirm"];

    constructor(key, name, spec) {
        super(key, name, spec, { forkEnvironment: true });
    }



}
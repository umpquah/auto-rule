import ConfigGroup from "../group";

export default class Confirmable extends ConfigGroup {
    static requiredProperties = ["content"];
    static optionalProperties = ["confirm"];

    constructor(key, name, spec) {
        super(key, name, Confirmable._adaptSpec(spec), { forkEnvironment: true });
    }

    static _adaptSpec(spec) {
        return (typeof spec === "object") ? spec : { content: spec };
    }
}
import ConfigGroup from "../group";
import Confirmable from "./confirmable";
import Parameters from "./parameters";
import Resolution from "./resolution";

export default class Stage extends ConfigGroup {
    static requiredProperties = ["title", "resolution"];
    static optionalProperties = ["description", "preamble", "parameters"];

    static subConfigs = {
        parameters: Parameters,
        preamble: Confirmable,
        resolution: Resolution,
    };

    constructor(parent, name, spec) {
        // Stages have independent scopes for names
        super(parent, name, spec, { forkEnvironment: true });
    }

    refresh() {
        this.environment.applyToAll((v) => v.refresh());
    }

    get value() {
        return {key: this.key, ...super.value};
    }
}
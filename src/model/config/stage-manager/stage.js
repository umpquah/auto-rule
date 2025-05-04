import { keys } from "lodash";
import AppError from "../../error";
import ConfigGroup from "../group";
import Confirmable from "./confirmable";
import Parameters from "./parameters";
import Resolution from "./resolution";


const EXACTLY_ONE_OF = ["resolution", "branching"];

export default class Stage extends ConfigGroup {
    static requiredProperties = ["title"];
    static optionalProperties = ["description", "preamble", "parameters", "resolution", "branching"];

    static subConfigs = {
        parameters: Parameters,
        preamble: Confirmable,
        resolution: Resolution,
    };

    constructor(parent, name, spec) {
        // Stages have independent scopes for names
        super(parent, name, spec, { forkEnvironment: true });
    }

    _validateSpec(spec) {
        super._validateSpec(spec);
            if (keys(spec).filter(prop => EXACTLY_ONE_OF.includes(prop)).length !== 1) {
                throw new AppError(
                    this.key,
                    `Must include exactly one: ${EXACTLY_ONE_OF.join(', ')}`,
                    "Specification",
                );
            }
        }

    refresh() {
        this.environment.applyToAll((v) => v.refresh());
        console.dir(this.environment);
    }

    get value() {
        return {key: this.key, ...super.value};
    }
}
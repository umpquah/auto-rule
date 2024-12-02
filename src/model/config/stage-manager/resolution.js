import { keys } from "lodash";
import ConfigGroup from "../group";
import Confirmable from "./confirmable";
import Wait from "./wait";

import AppError from "../../error";

const NEED_ONE_OF = ["announce", "action", "wait"];

export default class Resolution extends ConfigGroup {
    static requiredProperties = ["next"];
    static optionalProperties = ["announce", "action", "wait", "clearBeforeNext"];
    static subConfigs = {
        wait: Wait,
        action: Confirmable,
    };

    _validateSpec(spec) {
        super._validateSpec(spec);
        if (keys(spec).filter(prop => NEED_ONE_OF.includes(prop)).length === 0) {
            throw new AppError(
                this.key,
                `Must specify at least one of ${NEED_ONE_OF.join(', ')}`,
                "Specification",
            );
        }
        if ("action" in spec && "wait" in spec) {
            throw new AppError(this.key, "cannot have both action and wait", "Specification");
        }
    }
}   

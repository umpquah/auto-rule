import { keys } from "lodash";
import BlockBase from "./base";
import Wait from "./wait";
import AppError from "../../error";

const NEED_ONE_OF = ["announce", "action", "wait"];

export default class Resolution extends BlockBase {
    static requiredProperties = ["next"];
    static optionalProperties = ["announce", "action", "wait", "clearBeforeNext"];
    static scopeOrder = [
        ["announce", "action", "wait", "clearBeforeNext", "next"],
    ];
    static subConfigs = {
        wait: Wait,
    };

    constructor(parent, spec) {
        super(parent, "resolution", spec);
    }
    _validateSpec(spec) {
        super._validateSpec(spec);
        if (keys(spec).filter(prop => NEED_ONE_OF.includes(prop)).length === 0) {
            throw new AppError(
                "Specification",
                `Must specify at least one of {${NEED_ONE_OF.join(', ')}}`,
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

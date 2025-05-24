import { keys } from "lodash";
import AppError from "../error";
import { Confirmable, StructuredEntity, Wait } from "../entity";


const NEED_ONE_OF = ["announce", "action", "wait"];

export default class Resolution extends StructuredEntity {
    static requiredProps = ["next"];
    static optionalProps = ["announce", "action", "wait", "clearBeforeNext"];
    static subEntityTypes = {
        wait: Wait,
        action: Confirmable,
    };

    _validateSpec(spec) {
        super._validateSpec(spec);
        if (keys(spec).filter(prop => NEED_ONE_OF.includes(prop)).length === 0) {
            throw new AppError(
                this.key,
                `Must specify at least one: ${NEED_ONE_OF.join(', ')}`,
                "Specification",
            );
        }
        if ("action" in spec && "wait" in spec) {
            throw new AppError(this.key, "cannot have both action and wait", "Specification");
        }
    }
}   

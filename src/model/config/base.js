
import Entity from "../entity";
import AppError from "../app-error";

export class ConfigBase extends Entity {
    static requiredProps = [];
    static optionalProps = [];

    _validateSpec(spec) {
        const {requiredProps, optionalProps} = this.constructor;
        const allProps = [...requiredProps, ...optionalProps];
        if (allProps.length === 0)
            return;
        requiredProps.forEach((prop) => {
            if (!(prop in spec))
                throw new AppError("Config", `${this.key}: Missing required '${prop}' entry`);
        });
        for (const prop in spec) {
            if (!allProps.includes(prop)) {
                const where = this.key ? `within ${this.key}` : "at top level";
                throw new AppError("Config", `'${prop}' entry not allowed ${where}`);
            }
        } 
        super._validateSpec(spec);
    }
}

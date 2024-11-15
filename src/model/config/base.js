
import Entity from "../entity";
import AppError from "../app-error";

export default class ConfigBase extends Entity {
    static requiredProperties = [];
    static optionalProperties = [];

    static get allProperties() {
        return [
            ...this.requiredProperties,
            ...this.optionalProperties
        ];
    }

    _validateSpec(spec) {
        const { allProperties, requiredProperties } = this.constructor;
        if (allProperties.length === 0)
            return;
        requiredProperties.forEach((prop) => {
            if (!(prop in spec))
                throw new AppError("Specification", `missing required '${prop}' entry`, this.key);
        });
        for (const prop in spec) {
            if (!allProperties.includes(prop)) {
                throw new AppError("Specification", `'${prop}' entry not allowed here`, this.key);
            }
        } 
        super._validateSpec(spec);
    }
}

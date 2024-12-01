import { entries, keys, mapValues, omit, pick } from "lodash";

import AppError from "../error";
import ConfigNode from "./node";
import VariableBuilder from "./variable/builder";


// Simple group (object) whose keys are associated with variable specs
export default class ConfigGroup extends ConfigNode {
    static requiredProperties = [];
    static optionalProperties = [];
    static get allProperties() {
        return [
            ...this.requiredProperties,
            ...this.optionalProperties
        ];
    }
    static subConfigs = {};

    _validateSpec(spec) {
        if (typeof spec !== "object") {
            throw new AppError(this.key, "spec must be in object form { ... }");
        }
        const { allProperties, requiredProperties } = this.constructor;
        if (allProperties.length === 0)
            return;
        requiredProperties.forEach((prop) => {
            if (!(prop in spec))
                throw new AppError(this.key, `missing required '${prop}' entry`, "Specification");
        });
        for (const prop in spec) {
            if (!allProperties.includes(prop)) {
                throw new AppError(this.key, `'${prop}' not allowed here`,  "Specification");
            }
        } 
        super._validateSpec(spec);
    }

    _loadSpec(spec) {
        const { subConfigs } = this.constructor;
        const subConfigKeys = keys(subConfigs);
        const subSpecs = pick(spec, subConfigKeys);
        const plainSpec = omit(spec, subConfigKeys);

        this._groupItems = this._buildAndAdd(plainSpec);

        entries(subSpecs).forEach(([subConfigKey, spec]) => {
            const configClass = subConfigs[subConfigKey]; 
            this._groupItems[subConfigKey] = new configClass(this, subConfigKey, spec);
        });
    }

    _buildAndAdd(spec) {
        const variableGroup = VariableBuilder.fromSpecs(this, spec);
        this.environment.add(this, variableGroup);
        return variableGroup;
    }

    get value() {
        return mapValues(this._groupItems, (v) => v.value);
    }

    
}
import { mapValues } from "lodash";

import ConfigNode from "./node";
import VariableBuilder from "./variable/builder";

// Simple group (object) whose keys are associated with variable specs
export default class Group extends ConfigNode {
    _loadSpec(spec) {
        this._groupList = VariableBuilder.fromSpecs(this, spec)
        this.environment.add(this, this._groupList);
    }

    get value() {
        return mapValues(this._groupList[0], (v) => v.value);
    }
}
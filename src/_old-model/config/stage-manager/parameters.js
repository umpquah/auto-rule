import { assign } from "lodash";

import ConfigGroup from "../group";

export default class Parameters extends ConfigGroup {
    static validators = [
        (spec) => (
            Array.isArray(spec)
            || (typeof spec === "object")
            || "spec must be [...] or {...}"
        ),
    ];

    _loadSpec(spec) {
        let specList = Array.isArray(spec) ? spec : [spec];
        this.groupItems = {};
        specList.forEach((paramSpec) => {
            const variableGroup = this._buildAndAdd(paramSpec);
            assign(this.groupItems, variableGroup);
        });
    }
}
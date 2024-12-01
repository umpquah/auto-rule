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
        this._groupItems = {};
        specList.forEach((spec) => {
            const variableGroup = this._buildAndAdd(spec);
            assign(this._groupItems, variableGroup);
        });
    }
}
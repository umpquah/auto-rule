import { entries } from "lodash";
import ConfigGroup from "../group";
import Stage from "./stage";

export default class Stages extends ConfigGroup {
    _loadSpec(spec) {
        this._groupItems = {};
        entries(spec).forEach(([stageKey, stageSpec]) => {
            this._groupItems[stageKey] = new Stage(this, stageKey, stageSpec);
        });
    }
}
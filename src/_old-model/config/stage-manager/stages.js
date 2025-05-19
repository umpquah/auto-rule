import { entries } from "lodash";
import ConfigGroup from "../group";
import Stage from "./stage";

export default class Stages extends ConfigGroup {
    _loadSpec(spec) {
        this.groupItems = {};
        entries(spec).forEach(([stageKey, stageSpec]) => {
            this.groupItems[stageKey] = new Stage(this, stageKey, stageSpec);
        });
    }
}
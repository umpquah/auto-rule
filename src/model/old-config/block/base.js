import ConfigBase from "../base";
import Variable from "../../config/variable";

export default class BlockBase extends ConfigBase {
    _loadSpec(spec) {
        this.environment.add(this, Variable.buildFromSpecs(this, spec));
    }
}
import { ConfigBase } from "./base";
import Variable from "../variable";
import { pick } from "lodash";

const BASIC_KEYS = ["title", "description", "preamble"];
const PARAMETERS_KEY = "parameters";
const RESOLUTION_KEY = "resolution";

export class Stage extends ConfigBase {
    static optionalProps = ["description", "preamble", "parameters"];
    static requiredProps = ["title", "resolution"];

    constructor(parent, name, spec) {
        // Stages have separate environments, names are
        // reusable unless in global parameters
        super(parent, name, spec, true);
    }

    _loadSpec(spec) {
        this.props = {};
        this.environment.add(this, pick(spec, BASIC_KEYS));
    }

    _updateBasicProps() {
        BASIC_KEYS.forEach((key) => {
            this.props[key] = this.environment.bindings[key]?.value;
        });
    }

    refresh() {
        this.environment.refresh();
        this._updateBasicProps();
    }

}
import { pick } from "lodash";
import ConfigBase from "./base";
import { Basics, Parameters, Resolution } from "./blocks";

export class Stage extends ConfigBase {
    static optionalProperties = [
        ...Basics.optionalProperties,
        "parameters",
    ];
    static requiredProperties = [
        ...Basics.requiredProperties,
        "resolution",
    ]

    constructor(parent, name, spec) {
        // Stages have separate environments, names are
        // reusable unless in global parameters
        super(parent, name, spec, true);
        this.refresh();
    }

    _loadSpec(spec) {
        this.props = { resolution: {} };
        this.parameters = new Parameters(this, spec.parameters);
        this.basics = new Basics(this, pick(spec, Basics.allProperties));
        this.resolution = new Resolution(this, spec.resolution);
    }

    _updateProps() {
        Basics.allProperties.forEach((key) => {
            this.props[key] = this.environment.bindings[key]?.value;
        });
        Resolution.allProperties.forEach((key) => {
            this.props.resolution[key] = this.environment.bindings[key]?.value
        });
    }

    refresh() {
        this.environment.refresh();
        this._updateProps();
    }

}
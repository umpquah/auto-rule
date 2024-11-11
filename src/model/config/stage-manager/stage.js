import { pick } from "lodash";
import ConfigBase from "../base";
import { Basics, Parameters, Resolution } from "../blocks";

export default class Stage extends ConfigBase {
    static optionalProperties = [
        ...Basics.optionalProperties,
        "parameters",
    ];
    static requiredProperties = [
        ...Basics.requiredProperties,
        "resolution",
    ]

    constructor(parent, name, spec, options) {
        // Stages have independent scopes for names
        super(parent, name, spec, { forkEnvironment: true, ...options });
        this.refresh();
    }

    _loadSpec(spec) {
        this.props = { key: this.key, resolution: {} };
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
        return this.props;
    }

}
import { pick } from "lodash";
import ConfigBase from "../../old-config/base";
import { ContentAndConfirm, Parameters, Resolution } from "../../old-config/block";

export default class Stage extends ConfigBase {
    static requiredProperties = ["title", "resolution"];
    static optionalProperties = ["description", "preamble", "parameters"];
    static  = [
        "parameters",
        "preamble",
        ["title", "description"],
        ["resolution"],
    ];
    static subConfigs = {
        parameters: Parameters,
        preamble: ContentAndConfirm,
        resolution: Resolution,
    };

    constructor(parent, name, spec) {
        // Stages have independent scopes for names
        super(parent, name, spec, { forkEnvironment: true, intermediateKey: "stages" });
        this.refresh();
    }

    _loadSpec(spec) {
        this.constructor.scopeOrder.forEach((propertyList) => {

        });
        this.environment.add(this, Variable.buildFromSpecs(this, spec));
    }

    // _loadSpec(spec) {
    //     this.props = { key: this.key, resolution: {} };
    //     this.parameters = new Parameters(this, spec.parameters);
    //     this.basics = new Basics(this, pick(spec, Basics.allProperties));
    //     this.resolution = new Resolution(this, spec.resolution);
    // }



    // _updateProps() {
    //     Basics.allProperties.forEach((key) => {
    //         this.props[key] = this.environment.bindings[key]?.value;
    //     });
    //     Resolution.allProperties.forEach((key) => {
    //         this.props.resolution[key] = this.environment.bindings[key]?.value
    //     });
    // }

    // refresh() {
    //     this.environment.refresh();
    //     this._updateProps();
    //     return this.props;
    // }

}
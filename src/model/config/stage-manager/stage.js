import ConfigGroup from "../group";
import Confirmable from "./confirmable";
import Parameters from "./parameters";
import Resolution from "./resolution";

export default class Stage extends ConfigGroup {
    static requiredProperties = ["title", "resolution"];
    static optionalProperties = ["description", "preamble", "parameters"];

    static subConfigs = {
        parameters: Parameters,
        preamble: Confirmable,
        resolution: Resolution,
    };

    constructor(parent, name, spec) {
        // Stages have independent scopes for names
        super(parent, name, spec, { forkEnvironment: true });
        this.refresh();
    }

    // _loadSpec(spec) {
    //     this.constructor.scopeOrder.forEach((propertyList) => {

    //     });
    //     this.environment.add(this, Variable.buildFromSpecs(this, spec));
    // }

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

    refresh() {
        // TODO: Figure this out!
        // this.environment.refresh();
    }

}
import Stages from "./stages";
import ConfigGroup from "../group";
import Parameters from "./parameters";

export default class StageManager extends ConfigGroup {
    static requiredProperties = ["initialStage", "stages"];
    static optionalProperties = ["parameters"];
    static subConfigs = {
        parameters: Parameters,
        stages: Stages,
    }

    constructor(spec) {
        super(null, "", spec);
        this.reset();
    }

    reset() {
        // this._advanceUsingKey("initialStage", this.initialStageKey, true);
    }

    // _loadSpec(spec) {
    //     super._loadSpec(spec);
    //     this.initialStage = this._groupItems.initialStage.value;
    //     this.stages = this._groupItems.stages;
    //     this.parameters = this._groupItems.parameters?.value;
    // }
}


// export default class StageManager extends ConfigBase {




    

//     advance() {
//         const { resolution: { next, clearBeforeNext} } = this.current;
//         this._advanceUsingKey(`${this.current.key}.next`, next, clearBeforeNext);
//     }

//     _loadSpec(spec) {
//         super._loadSpec(spec);
//         const { stages: specStages, initialStage: initialStageKey } = spec;
//         this.initialStageKey = initialStageKey;
//         this.BuiltIns = new BuiltIns(this);
//         this.parameters = new Parameters(this, spec.parameters);
//         this.stages = {};
//         this.props = {};
//         entries(specStages).forEach(([stageKey, stageSpec]) => {
//             this.stages[stageKey] = new Stage(this, stageKey, stageSpec);
//         });
//     }

//     _getRefreshedStageForKey(sourceKey, stageKey) {
//         const stage = this.stages[stageKey];
//         if (!stage)
//             throw new AppError("Specification", `No stage with key '${stageKey}'`, sourceKey);
//         return stage.refresh();
//     }

//     _advanceUsingKey(sourceKey, stageKey, clearFirst = false) {
//         const stageProps = this._getRefreshedStageForKey(sourceKey, stageKey);
//         this.current = cloneDeep(stageProps);
//         if (clearFirst)
//             this.props.stages = [];
//         this.props.stages.push(this.current);
//     }
    
// }
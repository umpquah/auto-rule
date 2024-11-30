// import { cloneDeep, entries } from "lodash";
// import ConfigBase from "../base";
// import { BuiltIns, Parameters } from "../block";
// import Stage from "./stage";
// import AppError from "../../error";

export default class StageManager {}

// export default class StageManager extends ConfigBase {


//     constructor(spec) {
//         super(null, "", spec);
//         this.reset();
//     }

//     reset() {
//         this._advanceUsingKey("initialStage", this.initialStageKey, true);
//     }

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
import { cloneDeep } from "lodash";
import Stages from "./stages";
import ConfigGroup from "../group";
import Parameters from "./parameters";
import AppError from "../../error";

export default class StageManager extends ConfigGroup {
    static requiredProperties = ["initialStage", "stages"];
    static optionalProperties = ["parameters"];
    static subConfigs = {
        parameters: Parameters,
        stages: Stages,
    }

    constructor(spec) {
        super(null, "", spec);
        this.stages = this.groupItems.stages.groupItems;
        this.initialStageKey = this.groupItems.initialStage.value;
        this.state = {};
        this.reset();
    }

    reset() {
        this._advanceUsingKey(this.key, this.initialStageKey, true);
    }

    _getRefreshedStageForKey(sourceKey, stageKey) {
        const stage = this.stages[stageKey];
        if (!stage)
            throw new AppError(sourceKey, `No stage with key '${stageKey}'`, "Specification");
        stage.refresh();
        return stage.value;
    }

    _advanceUsingKey(sourceKey, stageKey, clearFirst = false) {
        const nextStageState = cloneDeep(this._getRefreshedStageForKey(sourceKey, stageKey));
        if (clearFirst)
            this.state.stages = [];
        this.state.stages.push(nextStageState);
        this.currentStageState = nextStageState;
    }

    advance() {
        const { resolution: { next, clearBeforeNext } } = this.currentStageProps;
        this._advanceUsingKey("next", next, clearBeforeNext);
    }
}



    



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

//     


    
// }
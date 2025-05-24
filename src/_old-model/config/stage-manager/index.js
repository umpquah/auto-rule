import { cloneDeep } from "lodash";
import AppError from "../../error";
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
        this.stages = this.groupItems.stages.groupItems;
        this.initialStageKey = this.groupItems.initialStage.value;
        this.state = {};
        this.round = 0;
        this.reset();
    }

    reset() {
        this._advanceUsingKey(this.key, this.initialStageKey, true);
    }

    _getRefreshedStageForKey(sourceKey, stageKey) {
        const stage = this.stages[stageKey];
        if (!stage)
            throw new AppError(sourceKey, `No stage with key '${stageKey}'`);
        stage.refresh();
        return {round: this.round, ...stage.value};
    }

    _advanceUsingKey(sourceKey, stageKey, clearFirst = false) {
        const nextStageState = cloneDeep(this._getRefreshedStageForKey(sourceKey, stageKey));
        if (clearFirst) {
            this.round += 1;
            this.state.stages = [];
        }
        this.state.stages.push(nextStageState);
        this.currentStageState = nextStageState;
    }

    advance(branchChoice = null) {
        const { resolution: { next, clearBeforeNext } } = this.currentStageState;
        console.log("Advancing to", next);
        this._advanceUsingKey("next", next, clearBeforeNext);
    }
}

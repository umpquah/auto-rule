import AppError from "../error";
import Stages from "./stages";
import StructuredWithParams from "./withparams";


export default class GameConfig extends StructuredWithParams {
  static requiredProps = ["stages", "initialStage"];
  static optionalProps = ["parameters"];
  static subEntityTypes = {
    stages: Stages
  };

  constructor(spec) {
    super(null, spec);
  }

  _validateSpec(spec) {
    super._validateSpec(spec);
    if (!(spec.initialStage in spec.stages))
      throw new AppError(this.key, `initial stage '${spec.initialStage}' not found in stages`);
  }
}

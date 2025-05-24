import Confirmable from "./confirmable";
import Resolution from "./resolution";
import StructuredWithParams from "./withparams";

export default class Stage extends StructuredWithParams {
  static requiredProps = ["title"];
  static optionalProps = ["description", "parameters", "preamble", "resolution"];

  static subEntityTypes = {
    preamble: Confirmable,
    resolution: Resolution,
  };
}


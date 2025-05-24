import { NameDeclarations, StructuredEntity, Wait } from "../entity";
import { Confirmable, Resolution } from "."

export default class Stage extends StructuredEntity {
  static requiredProps = ["title"];
  static optionalProps = ["description", "preamble", "parameters", "resolution"];
  static subEntityTypes = {
      wait: Wait,
      action: Confirmable,
  };
  constructor(name, spec, parent, scope){
    super(name, Confirmable._adaptSpec(spec), parent, scope)
  }

  static _adaptSpec(spec) {
    return (typeof spec === "object") ? spec : { content: spec };
  }
}
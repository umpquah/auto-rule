import Confirmable from "./confirmable";
import Wait from "./wait";
import { StructuredEntity } from "../entity";

export default class Resolution extends StructuredEntity {
    static requiredProps = ["next"];
    static optionalProps = ["announce", "action", "wait", "clearBeforeNext"];
    static mutexProps = [["action", "wait"]];
    static needOneOf = [["announce", "action", "wait"]]
    static subEntityTypes = {
        wait: Wait,
        action: Confirmable,
    };
}   

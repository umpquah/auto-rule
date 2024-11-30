import BlockBase from "./base";

export default class Wait extends BlockBase {
    static requiredProperties = ["duration"];
    static optionalProperties = ["hidden"];

    constructor(parent, spec) {
        super(parent, "parameters", spec);
    }
}
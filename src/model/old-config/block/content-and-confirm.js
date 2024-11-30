import BlockBase from "./base";

export default class ContentAndConfirm extends BlockBase {
    static requiredProperties = ["content"];
    static optionalProperties = ["confirm"];

    constructor(parent, name, spec) {
        super(parent, name, spec);
    }
}
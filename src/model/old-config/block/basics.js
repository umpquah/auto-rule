import BlockBase from "./base";
import AppError from "../../error";

export default class Basics extends BlockBase {
    static requiredProperties = ["title"];
    static optionalProperties = ["description", "preamble", "preambleConfirm"];
    constructor(parent, spec) {
        super(parent, "", spec);
    }
}


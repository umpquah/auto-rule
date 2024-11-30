

import { capitalize } from "lodash";
import BlockBase from "./base";

const BUILTINS_SPEC = {
    capitalize: capitalize
}

export default class BuiltIns extends BlockBase {
    constructor(parent) {
        super(parent, "<builtins>", BUILTINS_SPEC);
    }
}

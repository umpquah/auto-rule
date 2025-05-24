import AppError from "../../../error";
import { entries, keys, map } from "lodash";

import { Expression, ExpressionString, ExpressionWithUnits } from "./expression";
import Literal from "./literal";

export default class VariableBuilder {
    // static _buildSimple(parent, name, spec) {
    //     return new Literal(parent, name, spec);
    // }

    // static _buildTyped(parent, name, spec) {
    //     const types = keys(spec);
    //     if (types.length !== 1)
    //         throw new AppError(
    //             parent.key, `${name} must specify exactly one type`, "Internal"
    //         );
    //     const typeKeyword = types[0];
    //     const variableType = KEYWORD_TO_TYPE[typeKeyword];
    //     if (!variableType)
    //         throw new AppError(
    //             parent.key, `${name} has invalid type '${typeKeyword}'`,  "Internal"
    //         );
    //     return new variableType(parent, name, spec[typeKeyword]);
    // }

    // static _buildFromSpecList(parent, specList) {
    //     let result = [];
    //     specList.forEach((specGroup) => {
    //         const innerResult = this._buildFromSpecGroup(parent, specGroup);
    //         result = result.concat(innerResult);
    //     });
    //     return result;
    // }

    static _buildFromSpecGroup(parent, specGroup) {
        return map(specGroup, (name, spec) => new Expression(parent, name, spec));  
    }

    static fromSpecs(parent, specs) {
        if (Array.isArray(specs)) {
            return specs.map((specGroup) => this._buildFromSpecGroup(parent, specGroup));
        }
        else if (typeof specs === "object") {
            return VariableBuilder.fromSpecs(parent, [specs])
        } else {
            throw new AppError(
                this.key, "Variable.buildFromSpecs() requires array or object", "Internal"
            );
        }
    }
}

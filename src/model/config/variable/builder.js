import { assign, entries, isEmpty, keys, omit } from "lodash";

import AppError from "../../error";

import Chance from "./chance";
import { Expression, ExpressionString, ExpressionWithUnits } from "./expression";
import Literal from "./literal";
import Range from "./range";
import Select from "./select";

const TYPES = [Chance, Expression, ExpressionString, ExpressionWithUnits, Literal, Range, Select];
const KEYWORD_TO_TYPE = Object.assign(
    {},
    ...TYPES.map(
        t => ({[t.typeKeyword]: t})
    )
);

export default class VariableBuilder {
    static _buildSimple(parent, name, spec) {
        return new Literal(parent, name, spec);
    }

    static _buildTyped(parent, name, spec) {
        const types = keys(spec);
        if (types.length !== 1)
            throw new AppError(
                parent.key, `${name} must specify exactly one type`, "Internal"
            );
        const typeKeyword = types[0];
        const variableType = KEYWORD_TO_TYPE[typeKeyword];
        if (!variableType)
            throw new AppError(
                parent.key, `${name} has invalid type '${typeKeyword}'`,  "Internal"
            );
        return new variableType(parent, name, spec[typeKeyword]);
    }

    static _buildFromSpecList(parent, specList) {
        let result = [];
        specList.forEach((specGroup) => {
            const innerResult = this._buildFromSpecGroup(parent, specGroup);
            result = result.concat(innerResult);
        });
        return result;
    }

    static _buildFromSpecGroup(parent, specGroup) {
        let result = {};
        let additionalSpecs = {};
        entries(specGroup).forEach(([name, spec]) => {
            const [variableSpec, exprWithUnitsSpec] = _splitSpec(parent, name, spec);
            const builder = (typeof variableSpec === "object") ? this._buildTyped : this._buildSimple;
            result[name] = builder(parent, name, variableSpec);
            if (exprWithUnitsSpec) {
                assign(additionalSpecs, exprWithUnitsSpec);
            }
        });
        if (isEmpty(additionalSpecs)) {
            return result;
        } else {
            const exprWithUnitsGroup = this._buildFromSpecGroup(parent, additionalSpecs);
            assign(result, exprWithUnitsGroup)
            return result;
        }
    }

    static fromSpecs(parent, specs) {
        if (Array.isArray(specs)) {
            return this._buildFromSpecList(parent, specs);
        }
        else if (typeof specs === "object") {
            return this._buildFromSpecGroup(parent, specs);
        } else {
            throw new AppError(
                this.key, "Variable.buildFromSpecs() requires array or object", "Internal"
            );
        }
    }
}

function _splitSpec(parent, name, spec) {
    let variableSpec = spec;
    let unitsSpec, exprWithUnitsSpec;
    if (typeof spec === "object") {
        unitsSpec = spec["units"];
        variableSpec = omit(spec, "units");
    }
    if (unitsSpec) {
        if (!Array.isArray(unitsSpec) || unitsSpec.length < 1 || unitsSpec.length > 2) {
            throw new AppError("Specification", `${name} units must be array of 1-2 elements`, parent.key);
        }
        const withUnitsName = `${name}$display`;
        exprWithUnitsSpec = { 
            [withUnitsName]: { exprWithUnits: [name, ...unitsSpec] } 
        };
    }
    return [variableSpec, exprWithUnitsSpec];
}

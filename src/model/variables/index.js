import { assign, entries, isEmpty, keys, omit } from "lodash";
import Chance from "./chance";
import { Expression, ExpressionString, ExpressionWithUnits } from "./expression";
import Literal from "./literal";
import Range from "./range";
import Select from "./select";
import AppError from "../app-error";

const TYPES = [Chance, Expression, ExpressionString, ExpressionWithUnits, Literal, Range, Select];
const KEYWORD_TO_TYPE = Object.assign(
    {},
    ...TYPES.map(
        t => ({[t.typeKeyword]: t})
    )
);

export default class Variables {
    static buildSimple(parent, name, spec) {
        return new Literal(parent, name, spec);
    }

    static buildTyped(parent, name, spec) {
        const types = keys(spec);
        if (types.length !== 1)
            throw new AppError("Specification", `${parent.key}: ${name} must specify exactly one type`, parent.key);
        const typeKeyword = types[0];
        const variableType = KEYWORD_TO_TYPE[typeKeyword];
        if (!variableType)
            throw new AppError("Specification", `${parent.key}: ${name} has invalid type '${typeKeyword}'`, parent.key);
        return new variableType(parent, name, spec[typeKeyword]);
    }

    static buildFromSpecList(parent, specList) {
        let result = [];
        specList.forEach((specGroup) => {
            const innerResult = Variables.buildFromSpecGroup(parent, specGroup);
            result = result.concat(innerResult);
        });
        return result;
    }

    static buildFromSpecGroup(parent, specGroup) {
        let result = {};
        let additionalSpecs = {};
        entries(specGroup).forEach(([name, spec]) => {
            const [variableSpec, exprWithUnitsSpec] = _splitSpec(parent, name, spec);
            const builder = (typeof variableSpec === "object") ? this.buildTyped : this.buildSimple;
            result[name] = builder(parent, name, variableSpec);
            if (exprWithUnitsSpec) {
                assign(additionalSpecs, exprWithUnitsSpec);
            }
        });
        if (isEmpty(additionalSpecs)) {
            return [result];
        } else {
            const exprWithUnitsGroup = this.buildFromSpecGroup(parent, additionalSpecs);
            return [result, ...exprWithUnitsGroup];
        }
    }

    static buildFromSpecs(parent, specs) {
        if (Array.isArray(specs)) {
            return Variables.buildFromSpecList(parent, specs);
        }
        else if (typeof specs === "object") {
            return Variables.buildFromSpecGroup(parent, specs);
        } else {
            throw new AppError("Programming", "Variables.buildFromSpecs() requires array or object");
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
            throw new AppError("Specification", `${parent.key}: ${name} units must be array of 1-2 elements`);
        }
        const withUnitsName = `${name}$display`;
        exprWithUnitsSpec = { 
            [withUnitsName]: { exprWithUnits: [name, ...unitsSpec] } 
        };
    }
    return [variableSpec, exprWithUnitsSpec];
}

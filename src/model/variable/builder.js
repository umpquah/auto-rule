import { keys } from "lodash";
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

class SimpleBuilder {
    static build(parent, name, spec) {
        return new Literal(parent, name, spec);
    }
}

class TypedBuilder {
    static build(parent, name, spec) {
        const types = keys(spec);
        if (types.length !== 1)
            throw new AppError("Validation", `${name} must specify exactly one type`, parent.key);
        const typeKeyword = types[0];
        const variableType = KEYWORD_TO_TYPE[typeKeyword];
        if (!variableType)
            throw new AppError("Validation", `${name} has invalid type '${typeKeyword}'`, parent.key);
        return new variableType(parent, name, spec[typeKeyword]);
    }
}

export class VariableBuilder {
    constructor(parent, name, spec) {
        if (spec === undefined) {
            return undefined;
        }
        let builder = (typeof spec === "object") ? TypedBuilder : SimpleBuilder;
        return builder.build(parent, name, spec);
    }
}



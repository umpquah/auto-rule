import Expression from "./expression";

export default class ExpressionWithUnits extends Expression {
    static typeKeyword = "exprWithUnits";

    static validators = [
        [(spec) => Array.isArray(spec), "must be an array"],
        [
            (spec) => spec.length === 2 || spec.length === 3,
            "must specify expression, unit, [plural unit]",
        ],
    ];

    _loadSpec(spec) {
        let [expr, singularUnit, pluralUnit] = spec;
        pluralUnit = pluralUnit ? pluralUnit : `${singularUnit}s`;
        const newSpec = `(${expr}) + ' ' + ((${expr}) === 1 ? '${singularUnit}' : '${pluralUnit}')`;
        super._loadSpec(newSpec);
    }
}

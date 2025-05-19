import Expression from "./expression";

export default class ExpressionString extends Expression {
    constructor(parent, name, spec) {
        super(parent, name, "`" + spec + "`");
    }
}
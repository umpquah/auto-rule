import Expression from "./expression";

export default class ExpressionString extends Expression {
    static typeKeyword = "exprString";
    
    constructor(parent, name, spec) {
        super(parent, name, "`" + spec + "`");
    }
}
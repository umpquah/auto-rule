import Expression from "./expression";

export default class StringExpression extends Expression {
    static typeKeyword = "stringExpr";
    
    constructor(parent, name, spec) {
        super(parent, name, "`" + spec + "`");
    }
}
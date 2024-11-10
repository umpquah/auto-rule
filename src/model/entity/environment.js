import { assign, keys, isEmpty, omit, values } from "lodash";
import AppError from "../app-error";
import VariableBuilder from "../variable";


export default class Environment {
    constructor(bindings = {}) {
        this.bindings = bindings;
    }

    get names() {
        return keys(this.bindings);
    }

    get variables() {
        return values(this.bindings);
    }

    fork() {
        const forked = new Environment(this.parent);
        forked.bindings = {...this.bindings};
        return forked;
    }

    _validateName(parent, name) {
        const previous = this.bindings[name];
        if (previous) {
            throw new AppError(
                "Variable",
                `'${name}' already declared as ${previous.key}, ` +
                `re-declared within ${parent.key}`
            );
        }
    }

    static _splitSpec(name, spec) {
        let variableSpec = spec;
        let unitsSpec, exprWithUnitsSpec;
        if (typeof spec === "object") {
            unitsSpec = spec["units"];
            variableSpec = omit(spec, "units");
        }
        if (unitsSpec) {
            if (!Array.isArray(unitsSpec) || unitsSpec.length < 1 || unitsSpec.length > 2) {
                throw new AppError("Validation", "must specify array of 1 or 2 unit names");
            }
            const withUnitsName = `${name}$display`;
            exprWithUnitsSpec = { 
                [withUnitsName]: { exprWithUnits: [name, ...unitsSpec] } 
            };
        }
        return [variableSpec, exprWithUnitsSpec];
    }

    _addGroup(parent, groupSpec) {
        let groupBindings = {};
        let additionalSpecs = {};
        Object.entries(groupSpec).forEach(([name, spec]) => {
            this._validateName(parent, name);
            const [variableSpec, exprWithUnitsSpec] = Environment._splitSpec(name, spec);
            groupBindings[name] = new VariableBuilder(parent, name, variableSpec);
            if (exprWithUnitsSpec) {
                assign(additionalSpecs, exprWithUnitsSpec);
            }
        });
        assign(this.bindings, groupBindings);
        if (!isEmpty(additionalSpecs)) {
            const additionalBindings = this._addGroup(parent, additionalSpecs);
            assign(this.bindings, additionalBindings);
        }
        return groupBindings;
    }

    _addGroupList(parent, groupListSpec) {
        let newBindings = {};
        groupListSpec.forEach((groupSpec) => {
            const groupBindings = this._addGroup(parent, groupSpec);
            Object.assign(newBindings, groupBindings);
        });
        return newBindings;
    }

    add(parent, spec) {
        if (Array.isArray(spec)) {
            return this._addGroupList(parent, spec);
        } else if (typeof spec === "object") {
            return this._addGroup(parent, spec);
        } else {
            throw new AppError("Programming", "add() requires array or object");
        }
    }

    refresh() {
        this.variables.forEach((variable) => { variable.refresh() });
    }
}

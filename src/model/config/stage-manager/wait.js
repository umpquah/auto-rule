import ConfigGroup from "../group";

export default class Wait extends ConfigGroup {
    static requiredProperties = ["duration"];
    static optionalProperties = ["hidden"];
}
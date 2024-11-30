export default class AppError extends Error {
    constructor(key, message, category = "Config") {
        super(message);
        this.key = key;
        this.category = category;
        this.name = `AppError`;
    }
}
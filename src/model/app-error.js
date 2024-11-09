export default class AppError extends Error {
    constructor(category, message, key) {
        super(message);
        this.name = `${category}Error`;
        this.key = key;
    }
}
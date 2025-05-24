export default class AppError extends Error {
    constructor(key, message, category = "Config") {
      super(`${category} Error: ${key}: ${message}`);
      this.name = `AppError`;
    }
}
class InrenalServerError extends Error {
    constructor(message) {
        super(message);
        this.name = "InrenalServerError";
        this.status = 500;
    }
}

module.exports = InrenalServerError;
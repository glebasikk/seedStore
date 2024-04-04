class PreconditionFailed extends Error {
    constructor(message) {
        super(message);
        this.name = "Precondition Failed";
        this.status = 412;
    }
}

module.exports = PreconditionFailed;

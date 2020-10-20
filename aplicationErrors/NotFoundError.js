const ApplicationError  = require("./ApplicationError")

class NotFoundError extends ApplicationError{

    constructor(message){
        super("NotFound" ,404)
    }
}

module.exports =NotFoundError
const ApplicationError  = require("./ApplicationError")

class EmailInUseError extends ApplicationError{

    constructor(message){
        super("Email en Uso" ,400)
    }
}

module.exports =EmailInUseError
const ApplicationError  = require("./ApplicationError")

class GeneralError extends ApplicationError{

    constructor(message){
        super("Error Intente de nuevo" ,500)
    }
}

module.exports =GeneralError
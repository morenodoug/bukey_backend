const jwt = require("jsonwebtoken")
const config = require("../config")

function generateToken(payload){

    return jwt.sign(payload, config.jwtSecret , config.optionsJWT)

}



module.exports ={
     generateToken
}
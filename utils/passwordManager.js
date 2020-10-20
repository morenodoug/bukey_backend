
const bcrypt = require("bcrypt")
const config = require("../config")



function encryptPassword(texPassword){

    return  bcrypt.hashSync(texPassword, config.saltRounds)
} 

module.exports ={
    encryptPassword
}
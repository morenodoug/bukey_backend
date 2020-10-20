
const bcrypt = require("bcrypt")
const config = require("../config")

const ApplicationError = require("../aplicationErrors/ApplicationError")

function encryptPassword(texPassword){

    return  new Promise((resolve, reject) =>{
        bcrypt.hash(texPassword, config.saltRounds,  (err, result) =>{
            if(err) {
                console.error(err)
                reject(new ApplicationError())
            }else    {
                resolve(result)
            }
                
        })
    })  
} 

module.exports ={
    encryptPassword
}
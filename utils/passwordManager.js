
const bcrypt = require("bcrypt")
const config = require("../config")


const ApplicationError = require("../aplicationErrors/ApplicationError")
const GeneralError = require("../aplicationErrors/GeneralError")
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


function  arePasswordEquals(password,hash){
    return new Promise((resolve, reject) =>{

        bcrypt.compare(password, hash, function(err, result) {
            if(err){
                console.error(err)
                return reject(new GeneralError())
            }

            return resolve(result)
        })        

    })

}
module.exports ={
    encryptPassword,
    arePasswordEquals
}
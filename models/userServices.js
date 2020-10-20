const User = require("./user")
const EmailInUseError = require("../aplicationErrors/EmailInUseError")
const NotFoundError = require("../aplicationErrors/NotFoundError")
const GeneralError = require("../aplicationErrors/GeneralError")




function  findUserByEmail( email) {

    return new Promise((resolve, reject) =>{
        User.findOne({email:email} , (err, user) =>{
            if(err){
                console.error(err)
                return reject( new GeneralError())
            }
            if(user == null)
                return reject(new NotFoundError("user not found")) 
            return resolve(user)
        })
    })
}
function addNewUser(name, email,password){
    let usuario = new User({
        nombre: name ,
        email: email,
        password: password
        
    })
    return new Promise((resolve, reject) =>{


        usuario.save((err, userCreated) =>{
            if(err && err.code ===11000){
                
                return reject(new EmailInUseError() )
            }else if(err){
                return reject(err)
             
            }else{
                resolve(formatUserToSend(userCreated))
            }
    
        })
    })
}

function formatUserToSend(userCreated){
    let user ={}
    user.nombre = userCreated.nombre
    user.email = userCreated.email
    user.estado = userCreated.estado
    return user
}


module.exports ={
    addNewUser,
    findUserByEmail,
    formatUserToSend
}
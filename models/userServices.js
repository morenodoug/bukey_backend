const User = require("./user")
const EmailInUseError = require("../aplicationErrors/EmailInUseError")

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
                resolve(userCreated)
            }
    
        })
    })
}


module.exports ={
    addNewUser
}
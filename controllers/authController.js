const isEmail = require("isemail")
const User =require("../models/user")
const userServices = require("../models/userServices")
const passwordManager = require("../utils/passwordManager")
const ApplicationError = require("../aplicationErrors/ApplicationError")
const EmailInUseError = require("../aplicationErrors/EmailInUseError")
const tokenManager = require("../utils/tokenManager")
const NotFoundError = require("../aplicationErrors/NotFoundError")
const GeneralError = require("../aplicationErrors/GeneralError")
const { json } = require("body-parser")



async function signIn(req,res, next){
    if(req.body.email == undefined || !isEmail.validate(req.body.email)){
        return res.status(400).json({
            error: 'proporcione email'
        });
    }

    if(req.body.password == undefined || req.body.password == null  || req.body.password.trim() ==""){
        return res.status(400).json({
            error: 'proporcione password'
        });
    }
    try{
        const user = await userServices.findUserByEmail(req.body.email)
        const arePasswordEquals = await passwordManager.arePasswordEquals(req.body.password, user.password)

        if(arePasswordEquals){
            const token = tokenManager.generateToken(userServices.formatUserToSend(user))
            return res.status(200).json({token})
        }else{
            return res.status(401).json({})
        }
        


    }catch(err){
        
        if(err instanceof NotFoundError){
            return res.status(404).json(err)
        }
        console.log(err)
        return res.status(500).json(err)
        


    }


}
async function  signUp(req,res, next) {
    if(req.body.email == undefined || !isEmail.validate(req.body.email)){
        return res.status(400).json({
            error: 'proporcione email'
        });
    }

    if(req.body.name == undefined || req.body.name == null  || req.body.name.trim() ==""){
        return res.status(400).json({
            error: 'proporcione nombre'
        });
    }
    if(req.body.password == undefined || req.body.password == null  || req.body.password.trim() ==""){
        return res.status(400).json({
            error: 'proporcione password'
        });
    }
    try{
        const encryptedPassword=   await passwordManager.encryptPassword(req.body.password.trim())
        const newUserResponse =  await userServices.addNewUser(req.body.name, req.body.email, encryptedPassword)
        let token = tokenManager.generateToken(newUserResponse) 
        return res.status(201).json({user:newUserResponse, token} )

    }catch(err){
        console.error(err)
        if(err instanceof EmailInUseError){
            res.status(400)
        }else{
            res.status(500)
        }
        return res.json(err)

    }

}

module.exports = {
    signUp,
    signIn
}
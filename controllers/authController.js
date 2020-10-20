const isEmail = require("isemail")
const User =require("../models/user")
const userService = require("../models/userServices")
const passwordManager = require("../utils/passwordManager")
const ApplicationError = require("../aplicationErrors/ApplicationError")
const EmailInUseError = require("../aplicationErrors/EmailInUseError")


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

    try{
        const encryptedPassword=   await passwordManager.encryptPassword(req.body.password)
        const newUserResponse =  await userService.addNewUser(req.body.name, req.body.email, encryptedPassword)
        return res.status(201).json(newUserResponse)

    }catch(err){
        if(err instanceof EmailInUseError){
            res.status(400)
        }else{
            res.status(500)
        }
        return res.json(err)

    }

}

module.exports = {
    signUp
}
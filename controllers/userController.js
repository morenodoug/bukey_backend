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




async function  user(req,res, next) {

    try{
   
        const users =  await userServices.findAnotherUsers(req.decoded.id)
    
        return res.status(200).json({users:users} )

    }catch(err){
        console.error(err)
        if(err instanceof NotFoundError){
            res.status(err.status)
        }else{
            res.status(500)
        }
        return res.json(err)

    }

}

module.exports = {
    user,
 
}
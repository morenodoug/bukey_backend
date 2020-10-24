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




async function  getChatList(req,res, next) {

    try{
        const  id= req.decoded.id
        if( id=== undefined || id=== null )
            return res.status(400)
            
        const users =  await userServices.findAnotherUsers(req.decoded.id)
        return res.status(200).json({users:users} )

    }catch(err){
        console.error(err)
        if(err instanceof ApplicationError){
            res.status(err.status)
        }else{
            res.status(500)
        }
        return res.json()

    }

}

async function getProfile(req,res,next){
    
    
    try {
        const  id= req.decoded.id
        if( id=== undefined || id=== null )
            return res.status(400).json()
        
        const user = await userServices.findUserById(id)

        return res.json(user)

    } catch (error) {
        if (error instanceof ApplicationError)
            return res.status(error.status).json()
        return res.status(500).json()    
    }


}

module.exports = {
    getChatList,
    getProfile
    
 
}
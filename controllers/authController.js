const isEmail = require("isemail")
const User =require("../models/user")
//const bcrypt = require("bcrypt")
function signUp(req,res, next) {

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

    let usuario = new User({
        nombre: req.body.name ,
        email: req.body.email,
        password:   req.body.password
    })

    usuario.save((err, usuarioDB) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        return res.json({usuario})
    })
   
}

module.exports = {
    signUp
}
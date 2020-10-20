const IsEmail = require("isemail")

const Isemail =require("isemail")

function siginFunction(req,res, next) {

    if(req.body.email == undefined || !Isemail(req.body.email)){
        return res.status(400).json({
            error: 'proporcione email'
        });
    }

    if(req.body.name == undefined || req.body.name == null  || req.body.trim() ==""){
        return res.status(400).json({
            error: 'proporcione nombre'
        });
    }

    return   res.json()
}
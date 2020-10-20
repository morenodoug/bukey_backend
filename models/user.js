const moongose = require('mongoose')
let schema = moongose.Schema

let userSchema = new moongose.Schema({
    nombre:{
        type: String,
        required:[true, "nombre necesario"]
    },
    email:{
        type: String,
        unique: true,
        required:[true, "nombre necesario"]
    },
    password:{
        type: String,
        reguired: [true, "password necesario"]
    },
    estado:{
        type: Boolean,
        default: true
    },

})
module.exports = moongose.model('User', userSchema)
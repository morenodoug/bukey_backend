const moongose = require('mongoose')
let schema = moongose.Schema

var conversationSchema = new mongoose.Schema({

    users: [],
    messages: [],
    type:{ 
        type:String,
        default :"normal"
    }

});


module.exports = moongose.model('Conversation', conversationSchema)
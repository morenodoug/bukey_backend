const moongose = require('mongoose')
let schema = moongose.Schema

var messageSchema = new mongoose.Schema({
    conversation:moongose.Types.ObjectId ,
    user :moongose.Types.ObjectId,
    message_body:{type: String},
    message_readed:{type: Boolean, default: false},
    created_at: { type: Date, default: Date.now },
});


module.exports = moongose.model('Message', messageSchema)
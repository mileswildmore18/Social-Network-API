const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

//Defining the Reaction schema
const reactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new DataTransfer(timestamp).toISOString()
    }
}, {//Ensuring getters are applied when converting the document to JSON
    toJSON: {
        getters: true
    },
    id: false
}); //Disables the virtual 'id' field since '_id' is present

module.exports = reactionSchema;
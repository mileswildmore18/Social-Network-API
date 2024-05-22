const mongoose = require('mongoose');
const { Schema } = mongoose;

//Defining the reactionSchema
const reactionSchema = new Schema({
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
    }
})

//Defining the thoughtSchema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toLocaleDateString(),
        //Uses a getter method to format the timestamp on the query
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {//Vituals and getters are included in the output when documents are converted to JSON or plain objects
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
});

//Creating a virtual property reactionCount that retrieves the length of the thought's array field on the query
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

//Creating the Thought model
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
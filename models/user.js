const mongoose = require('mongoose');
const {Schema} = mongoose;

//Defining the schema used to created User Model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
        //This is an array that will prompt that it must match a valid email address
    },
    thoughts: [
        {   //This is an array of _id values that will reference the Thought model 
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    { //Virtuals are included with our response, which overrides the default behavior
      //Used after querying MongoDb
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
);

//Creates a virtual property 'friendCount' that gets the number of friends
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

//Creating the User model
const User = mongoose.model('User', userSchema);

module.exports = User
const { Schema, model } = require('mongoose');

const validateEmail = function (email) {
    const re = /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/;
    return re.test(email);
} // function to validate email using regular expression


const userSchema = new Schema(
    { // schema for user. Each user has a username, email, and thoughts
        username: {
            type: String, // username is a string
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String, // email is a string, unique, and required, and a valid email
            unique: true,
            required: true,
            validate: [validateEmail, 'Please create a valid email address'],
            match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/, 'Please fill a valid email address'] // must have a valid email
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ] // array of friend IDs
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema
.virtual('friendCount')
.get(function(){
    return this.friends.length;
})

const User = model('user', userSchema)

module.exports = User


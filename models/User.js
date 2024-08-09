const { Schema, model } = require('mongoose');

const validateEmail = function (email) {
    const re = /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/;
    return re.test(email);
}


const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [validateEmail, 'Please create a valid email address'],
            match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/, 'Please fill a valid email address']
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
        ]
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

const User = model('users', userSchema)

module.exports = User


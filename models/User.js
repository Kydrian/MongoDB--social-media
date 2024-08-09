const { Schema, model } = require('mongoose');

const validateEmail = function (email) { // this is a function that validates the users email using regex.
    const re = /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/;
    return re.test(email);
}


const userSchema = new Schema(
    {
        username: { // username must be a string
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: { // email must have validateEmail regex
            type: String,
            unique: true,
            required: true,
            validate: [validateEmail, 'Please create a valid email address'],
            match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/, 'Please fill a valid email address']
        },
        thoughts: [ // foreign key to thoughts array
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [ // foreign key to friends array
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


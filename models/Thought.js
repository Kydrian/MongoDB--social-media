
const { Schema, model } = require('mongoose');
const Mongoose = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: { // this will give reaction an ID
            type: Schema.Types.ObjectId,
            default: new Mongoose.Types.ObjectId
        },
        reactionBody: { // reaction body must be a string
            type: String,
            required: true,
            maxlength: 280
        },
        username: { // referes to user schema
            type: String,
            required: true
        },
        createdAt: { // javascript that allows us to see the current date create at
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)

const thoughtSchema = new Schema(
    {
        thoughtText: { // text must be a string
            type: String,
            required: true,
            maxLength: 280,
            minlenght: 1
        },
        createdAt: { // javascript that tells us the date created on
            type: Date,
            default: Date.now
        },
        username: { // refers to user schema
            type: String,
            required: true
        },
        reactions: [reactionSchema] // foreign key to reaction schema
    },
    {
        toJSON: {
            virtual: true,
            getters: true
        },
        id: false
    }

)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

const Thought = model('thought', thoughtSchema)

module.exports = Thought
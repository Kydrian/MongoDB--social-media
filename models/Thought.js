
const { Schema, Types, model } = require('mongoose');
const Mongoose = require('mongoose');

const reactionSchema = new Schema(
    { // schema for reactions. Each reaction has a reactionId, reactionBody, username, and createdAt function
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
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
    { // schema for thoughts. Each thought has a thoughtText, username, and createdAt function
        thoughtText: {
            type: String, // thoughtText is a string
            required: true,
            maxLength: 280,
            minlenght: 1
        },
        createdAt: {
            type: Date,
            default: Date.now // createdAt is a Date
        },
        username: {
            type: String, // username is a string
            required: true
        },
        reactions: [reactionSchema] // reactions is an array of reactionSchema
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
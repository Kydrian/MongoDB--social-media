const { User, Thought } = require('../models');

module.exports = {
    async getAllThoughts(req, res) { // get all thoughts
        try {
            const AllThoughts = await Thought.find();
            res.status(200).json(AllThoughts)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }

    },


    async getSingleThought(req, res) {// get a single thought by ID
        try {
            const thought = await Thought.findOne({ _id: req.params.id })
            if (!thought) {
                return res.status(404).json({ message: 'no thought with this ID' })

            }
            res.json(thought)
        } catch (err) {
            console.log(err),
                res.status(500).json(err)

        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Application created, but found no user with that ID',
                })
            }

            res.json('Created Thought 🎉!');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thoughts = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            if (!thoughts) {
                return res.status(404).json({ message: 'no thought with that ID' })
            }
            res.json(thoughts)

        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id })

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that Id' })
            }
            res.json(thought)

        } catch (err) {
            res.status(500).json(err)
        }
    },

    async addReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (!reaction) {
                return res.status(404).json({ message: 'no thought with that ID' })
            }
            res.json(reaction)
        } catch (err) {
            res.status(500).json(err)
        }
    },


    async removeReaction(req, res) {
        try {
            const remove = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                {runValidators: true, new: true}
            );

            if (!remove) {
                return res.status(404).json({ message: 'No Thought found with that ID :(' });
            }

            res.json(remove);

        } catch (err) {
            res.status(500).json(err)
        }
    }




}
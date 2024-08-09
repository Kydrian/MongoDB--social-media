const { User, Thought } = require('../models');
module.exports = {
    async getUser(req, res) {
        try {
            const users = await User.find().populate('thoughts', 'friends');
            res.json(users);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            .populate('thoughts','friends');
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            res.status(200).json(user);
        } catch (err) {
            console.log('Uh Oh, something went wrong', err);
            res.status(500).json({ message: 'something went wrong', error: err.message });
        }
    },

    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            console.log(newUser),
            res.json(newUser);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async updateUser(req, res) {
        try {
            const users = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            if (!users) {
                return res.status(404).json({ message: 'no user with that ID' })
            }
            res.json(users);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.id });
            if (!user) {
                return res.status(404).json({ message: 'no user with that ID' })
            }
            res.status(200).json(user);
            console.log(`Deleted: ${user}`);
        } catch (err) {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' });
        }
    },

    async addFriend(req, res) {
        try {
            const users = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } }, // addToSet adds to additional tree
                { runValidators: true, new: true }
            )
            if (!users) {
                return res.status(404).json({ message: 'no user with that ID' })
            }
            res.status(200).json(users);
            console.log(`Deleted: ${users}`);
        } catch (err) {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' });
        }
    },
    async deleteFriend(req, res) {
        try{
            const deleteFreind = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: req.params.friendId}}, // $pull removes from set
                {runValidators: true, new: true}
            )
            if(!deleteFreind) {
                return res.status(404).json({message: 'no user with that ID'});
            }
            res.json(deleteFreind)
        } catch (err) {
            res.status(500).json({ message: 'something went wrong'})
        }
    }
}


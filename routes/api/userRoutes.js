const router = require('express').Router();
const {
    // import controllers and function names from userController
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} =require ('../../controllers/userController');

router.route('/').get(getUser).post(createUser);
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;










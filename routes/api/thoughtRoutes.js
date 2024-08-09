const router = require('express').Router();

const { // this exports all of the async functions created in the controllers folder
    getAllThoughts,
     getSingleThought,
     createThought,
     updateThought,
     deleteThought,
     addReaction,
     removeReaction

} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought); 
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought); 
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);
module.exports = router
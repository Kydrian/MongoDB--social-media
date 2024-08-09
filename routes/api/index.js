const router = require('express').Router();
const userRoute = require('./userRoutes');
const thoughtRoute = require('./thoughtRoutes');

router.use('/thoughts', thoughtRoute );
router.use('/users', userRoute );

module.exports = router;
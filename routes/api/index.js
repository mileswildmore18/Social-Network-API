const router = require('express').Router();
const userRoute = require('./userRoute');
const thoughtsRoute = require('./thoughtsRoute');
const friendIDRoute = require('./friendIDRoute');
const reactionRoute = require('./reactionRoute');

router.use('/users', userRoute);
router.use('/thoughts', thoughtsRoute);
router.use('/reactions', reactionRoute);
router.use('/friends', friendIDRoute);

module.exports = router;
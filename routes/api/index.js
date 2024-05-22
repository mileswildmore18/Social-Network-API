const router = require('express').Router();
const userRoute = require('./userRoute');
const thoughtsRoute = require('./thoughtsRoute');
const friendIDRoute = require('./friendIDRoute');
const reactionRoute = require('./reactionRoute');

router.use('/user', userRoute);
router.use('/thought', thoughtsRoute);
router.use('/reaction', reactionRoute);
router.use('/friend', friendIDRoute);

module.exports = router;
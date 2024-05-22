//connection to the api
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req,res) =>{
    return res.send("<h1>WRONG ROUTE!</h1>")
});

module.exports = router;
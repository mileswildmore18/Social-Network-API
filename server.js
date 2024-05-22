const express = require('express');
const routes = require('./routes/');
const mongoose = require('./config/connection');
// imports the mongoose connection

//Providing the port number
const app = express();
const PORT = 3001;

//Adding Middleware to the server
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);

//syncs mongoose models to the database
mongoose.sync({ force: false }).then(() =>{
    app.listen(PORT, () => {
        console.log (`App listening on port ${PORT}!`);
    });
});
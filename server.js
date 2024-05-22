const express = require('express');
const routes = require('./routes/api');
const mongoose = require('./config/connection');
// imports the mongoose connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

//syncs mongoose models to the database
mongoose.sync({ force: false }).then(() =>{
    app.listen(PORT, () => {
        console.log (`App listening on port ${PORT}!`);
    });
});
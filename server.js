const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/api/userRoute')
const thoughtsRoute = require('./routes/api/thoughtsRoute')
// imports the mongoose connection

const app = express();

//Adding Middleware to the server and to parse json
app.use(express.json());

//Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/socialNetwork', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

//Using the user and thought routes
app.use('/api/users', userRoute)
app.use('/api/thoughts', thoughtsRoute);

//Starting the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
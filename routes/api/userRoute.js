//adding the route for User
const express = require('express');
const router = express.Router();
const User = require('../../models/User');

//GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//GET a single user by its _id and populated thought and friend data
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('thoughts')
            .populate('friends');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Using POST to add a new user
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Using PUT to update a user by its _id
router.put('/:id', async (req, res) =>{
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found'});

        if (req.body.username != null) {
            user.username = req.body.username;
        }
        if (req.body.email != null) {
            user.email = req.body.email;
        }

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

//Using DELETE to remove a user by its _id
router.delete('/:id', async (req,res) =>{
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found'});

        await user.remove();
        res.json({message: 'User deleted'});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
 });

 module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../../models/User');

//Adding from Existing routes

//Using POST to add a new friend to a user's friend's list
router.post('/:userId/friends/:friendId', async (req, res) =>{
    try {
        //finds the user by id
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({message: 'User not found'});

        //finds a friend by id
        const friend = await User.findById(req.params.friendId);
        if (!friend) return res.status(404).json({message: 'Friend not found'});

        //Checking if friend already exists by id
        if (user.friends.includes(req.params.friendId)) {
            return res.status(400).json({ message: 'Friend already added'});
        }
        //Adding friend id to the user's id
        user.friends.push(req.params.friendId);
        
         //Saving the user and returns updated user documents
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

//Using DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        //Finds user by id
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({message: 'User not found'});

        //Checks if friend exists in the user's friends array
        const friendIndex = user.friends.indexOf(req.params.friendId);
        if (friendIndex === -1) {
            return res.status(404).json({message: 'Friend not found in friend list'});
        }
        //Removes the friend id from the user's friends array if present
        user.friends.splice(friendIndex, 1);

        //Saving the user and returns the updated user documents
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

module.exports = router;
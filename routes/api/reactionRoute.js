//adding the route for reaction from the thought
const express = require('express');
const router = express.Router();
const {Thought} = require('../../models/');

// Adding from existing routes

// Adding POST to create a new reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        // finds the thought by id and adds a new reaction
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { new: true })
        if (!thought) return res.status(404).json({ message: 'Thought not found' });

        res.status(201).json(thought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Using DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        // Finds thought by id
        const thought = await Thought.findOneAndUpdate(
             // Finds reaction by id
            {_id: req.params.thoughtId},
            {$pull: {reactions: req.params.reactionId}},
            {runValidators: true, new: true}
        )

       
        
        

        // Removes the selected reaction from thought id
        
        
        res.json(thought);
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message });
    }
});


    


module.exports = router;
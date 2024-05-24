//adding the route for reaction from the thought
const express = require('express');
const router = express.Router();
const Thought = require('../../models/Thought');

// Adding from existing routes

// Adding POST to create a new reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        // finds the thought by id
        const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$addToSet: {reactions: req.body}},{new: true})
        if (!thought) return res.status(404).json({ message: 'Thought not found' });

        // adds a new reaction by username and the body of the reaction
        // const newReaction = {
        //     reactionBody: req.body.reactionBody,
        //     username: req.body.username
        // };

        // Generates a new reaction from the thought
        // thought.reactions.push(newReaction);

        // Saves the new reaction and returns thought documents
        // const updatedThought = await thought.save();
        res.status(201).json(thought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Using DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/reactionId', async (req, res) => {
    try {
        // Finds thought by id
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) return res.status(404).json({ message: 'Thought not found' });

        // Finds reaction by id
        const reaction = thought.reactions.find(
            reaction => reaction.reactionId.toString() === req.params.reactionId
        );
        if (!reaction) return res.status(404).json({ message: 'Reaction not found' })

        // Removes the selected reaction from thought id
        thought.reactions.pull(reaction);
        const updatedThought = await thought.save();
        res.json(updatedThought);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
//adding the route for Thought
const express = require('express');
const router = express.Router();
const Thought = require('../../models/Thought');
const User = require('../../models/User');

//GET all thoughts
router.get('/', async (req, res) => {
    try {
        //Gathering information of all thoughts
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//GET a single thought by its _id
router.get('/:id', async (req, res) => {
    try {
        //Finding a single thought by id
        const thought = await Thought.findById(req.params.id);
        if (!thought) return res.status(404).json({ message: 'Thought not found' })
        res.json(thought);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Using POST to create a new thought
router.post('/', async (req, res) => {

    //Adding a thought by id, username and userid
    const thought = new Thought({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
        userId: req.body.userId
    });

    try {
        //Saving the new thought and updating the thought document
        const newThought = await thought.save();

        //Pushes the created thought's _id to the associated user's thoughts array field
        const user = await User.findById(req.body.userId)

        //Checking if user exists
        if (!user) return res.status(404).json({ message: 'User not found' });

        //Adding new thought _id to the user's id
        user.thoughts.push(newThought._id)

        //Saving the thought and returns updated user documents
        await user.save();

        res.status(201).json(newThought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Using PUT to update a thought by its _id
router.put('/:id', async (req, res) => {
    try {
        //finds a thought by id and thoughtText
        const thought = await Thought.findById(req.params.id);
        if (!thought) return res.status(404).json({ message: 'Thought not found' });
        //
        if (req.body.thoughtText != null) {
            thought.thoughtText = req.body.thoughtText;
        }
        //Updating and saving the thought, and updating the user documents
        const updatedThought = await thought.save();
        res.json(updatedThought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Using DELETE to remove a thought by its _id
router.delete('/:id', async (req, res) => {
    try {
        //finds a thought by id
        const thought = await Thought.findById(req.params.id);
        if (!thought) return res.status(404).json({ message: 'Thought not found' });

        //removes the thought by id
        await thought.deleteOne();

        //Removing the thought from the user's thoughts array
        const user = await User.findById(thought.userId);
        if (user) {
            user.thoughts.pull(thought._id);
            //Saving the information that was deleted
            await user.save();
        }
        res.json({ message: 'Thought deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
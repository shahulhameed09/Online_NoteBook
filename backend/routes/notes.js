const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


//Route 1: Adding notes using POST: /api/notes/addnotes
router.post('/addnotes', fetchuser, [
    body('title', 'Title must be atleast 3 characters').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),

], async (req, res) => {
    // validating
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    };

    //Adding Notes
    try {
        const note = await Notes.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
        })
        note.save();
        res.send(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

//Route 2: Fetching all notes using GET: /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.send(notes);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 3: Updating notes using PUT: /api/notes/updatenote/id
router.put('/updatenotes/:id', fetchuser, async (req, res) => {

    //Creating new object
    const newnote = {};
    const { title, description, tag } = req.body;

    if (title) { newnote.title = title };
    if (description) { newnote.description = description };
    if (tag) { newnote.tag = tag };

    try {

        //find the note to be updated
        const note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not found") };

        //If user is authenticated
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "You are not authorized" });
        }

        //Update the fields of the note that needs updating
        updatednote = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
        res.send(updatednote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

//Route 4: deleting notes using DELETE: /api/notes/deletenotes/id
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {

    try {
        //find the note to be deleted
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not found") };

        //If user is authenticated
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "You are not authorized" });
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note is Deleted", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;
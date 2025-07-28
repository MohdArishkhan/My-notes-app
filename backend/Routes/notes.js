import express from "express";
import Note from "../Models/Note.js";
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();
//Get notes
router.get("/",protect , async(req,res)=>{
    try {
        const notes= await Note.find({createdby:req.user._id})
        res.json(notes);
    } catch (error) {
        console.log("get all notes error",error);
    }
})

//create a note
router.post("/",protect,async(req,res)=>{
    const {title,description} = req.body;
    try {
        if(!title || !description){
            return res.status(401).json({message:"please fill all details"})
        }
        const note = await Note.create({
            title,
            description,
            createdby: req.user._id,
        });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({message : "server error"});
    }
})

//get a note 
router.get("/:id",protect,async(req,res)=>{
    try {
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message:"note not found check in notes.js"})
        }
    } catch (error) {
        console.log(error)
    }
});

// Update a note
router.put("/:id", protect, async (req, res) => {
    const { title, description } = req.body;

    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        if (note.createdby.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        note.title = title || note.title;
        note.description = description || note.description;

        const updatedNote = await note.save();

        res.json(updatedNote);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


// DELETE a note
router.delete("/:id", protect, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        if (note.createdby.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await note.deleteOne(); // <-- CALL this function properly with ()
        res.json({ message: "Note was deleted" });
    } catch (error) {
        console.error("Error deleting note:", error.message);
        res.status(500).json({ message: "Server error while deleting note" });
    }
});

export default router;

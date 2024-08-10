const Note = require('../../Schema/notes');

// Fetch notes
const FetchNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).send({ success: true, message: notes });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
};

// Create notes
const CreateNotes = async (req, res) => {
    try {
        const { title, content, tags, base64 } = req.body;

        const note = new Note({
            user :req.user.id,
            folder: req.folder._id,
            title,
            content,
            tags,
            image: base64,
        });
        const savedNote = await note.save();

        res.status(200).send({ success: true, message: savedNote });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
};

// Update notes
const UpdateNotes = async (req, res) => {
    try {
        const { title, content, tags, base64 } = req.body;
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title; }
        if (content) { newNote.content = content; }
        if (tags) { newNote.tags = tags; }
        // If base64 is not provided, explicitly set image to null
        if (base64 === undefined || base64 === null || base64 === '') {
            newNote.image = null;
        } else {
            newNote.image = base64;
        }
        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }


        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.status(200).send({ status: 200, message: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ status: false, message: "Internal Server Error" });
    }
};

// Delete notes
const DeleteNotes = async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send({ status: false, message: "Not Found" });
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.status(200).send({ status: 200, message: "Note successfully deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

// Delete all notes
const DeleteAllNotes = async (req, res) => {
    try {

        const result = await Note.deleteMany({ folder: req.params.id });
        res.status(200).send({ success: true, message: 'All notes deleted successfully', deletedCount: result.deletedCount });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { FetchNotes, CreateNotes, UpdateNotes, DeleteNotes, DeleteAllNotes };

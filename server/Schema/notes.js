const mongoose = require('mongoose');

const schema = mongoose.Schema;

const notesSchema = new schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    folder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'folder',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    tags: [{
        type: String,
    }],
    image: {
        type: String,
        default: null,  // Allow `null` for image
      }
});

const Note = mongoose.model('Note', notesSchema);
module.exports = Note;

const express = require('express');
const { FetchNotes,CreateNotes,UpdateNotes,DeleteNotes,DeleteAllNotes } = require('../Controllers/Notes/Notes');
const validateFolderOwnership = require('../Middleware/validateFolderOwnership');
const Fetchuser = require('../Middleware/Fetchuser')
const router = express.Router();

router.get('/fetchallnotes', FetchNotes);
router.post('/create-notes',validateFolderOwnership,Fetchuser,CreateNotes);
router.put('/update-notes/:id',UpdateNotes);
router.delete('/delete-notes/:id',DeleteNotes);
router.delete('/deleteallnotes/:id',DeleteAllNotes);

module.exports = router;
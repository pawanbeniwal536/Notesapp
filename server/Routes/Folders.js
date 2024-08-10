const express = require('express')
const { createFolder,updateFolder,deleteFolder , fetchFolder}  = require('../Controllers/Folders/Folder')
const fetchUser = require('../Middleware/Fetchuser')

const router = express.Router();

router.post('/create-folder',fetchUser,createFolder);
router.post('/update-folder/:id',fetchUser,updateFolder);
router.delete('/delete-folder/:id',fetchUser,deleteFolder)
router.get('/fetch-folders',fetchUser, fetchFolder)

module.exports = router
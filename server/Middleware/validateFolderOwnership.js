const Folder = require('../Schema/folder');

const validateFolderOwnership = async (req, res, next) => {
    const folderId = req.body.folderId || req.params.folderId 
    try {
        const folder = await Folder.findById({_id:folderId});
        if (!folder) {
            return res.status(404).send({ success: false, message: "Folder not found" });
        }

        req.folder = folder;
        next();
    } catch (error) {
        console.error('Error validating folder ownership:', error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
};

module.exports = validateFolderOwnership;

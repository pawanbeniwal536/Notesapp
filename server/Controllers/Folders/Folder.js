const Folder = require('../../Schema/folder');
const Note = require('../../Schema/notes');

const createFolder = async (req, res) => {
    try {
        const { name } = req.body;
        let uniqueName = name;
        let count = 1;

        // Check if a folder with the same name exists
        while (await Folder.findOne({ folderName: uniqueName, user: req.user.id })) {
            uniqueName = `${name}${count}`;
            count++;
        }

        // Create the folder with the unique name
        const data = await Folder.create({
            user: req.user.id,
            folderName: uniqueName,
        });

        res.status(200).send({ success: true, message: data });
    } catch (error) {
        console.error('Error creating folder:', error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
}

const updateFolder = async (req, res) => {
    try {
        const { newName } = req.body;

        // Find the folder to be updated
        const folderId = req.params.id
        const folder = await Folder.findById(folderId);
        if (!folder) {
            return res.status(404).send({ success: false, message: "Folder not found" });
        }

        // Check if the new name is already taken
        let uniqueName = newName;
        let count = 1;

        while (await Folder.findOne({ folderName: uniqueName, user: req.user.id, _id: { $ne: folderId } })) {
            uniqueName = `${newName}${count}`;
            count++;
        }

        // Update the folder name
        folder.folderName = uniqueName;
        await folder.save();

        res.status(200).send({ success: true, message: folder });
    } catch (error) {
        console.error('Error updating folder name:', error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
}

const deleteFolder = async (req, res) => {
    try {
        // Find the folder by its ID
        const folder = await Folder.findById(req.params.id);
        if (!folder) {
            return res.status(404).send({ success: false, message: "Folder not found" });
        }


        await Note.deleteMany({ folder: folder._id });
        // Delete the folder
        await folder.deleteOne();
        
        res.status(200).send({ success: true, message: "Folder deleted successfully" });
    } catch (error) {
        console.error('Error deleting folder:', error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
}

const fetchFolder = async ( req,res) => {

    try{
        const folders = await Folder.find({user:req.user.id});
        if (!folders || folders.length === 0) {
            return res.status(200).send({ success: true, message: "No folders" });
        }
        const allFolders = []

    folders.forEach(fol=>{
      allFolders.push({_id:fol._id,name:fol.folderName,user:fol.user})
    }
    )
    res.status(200).send({success:true,message:allFolders})

}
 catch(error){
    console.log('error in fetching all notes',error)
    res.status(500).send({ success:false, message:"internal server error"})
 }
}


module.exports = { createFolder , updateFolder , deleteFolder ,fetchFolder }

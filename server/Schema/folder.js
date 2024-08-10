const mongoose = require('mongoose');

const schema = mongoose.Schema;

const folderSchema = new schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    folderName:{
        type:String,
        required:true,
        unique:true
    }
})

const Folders = mongoose.model('folder',folderSchema);

module.exports = Folders;
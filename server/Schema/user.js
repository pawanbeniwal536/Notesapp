const mongoose = require('mongoose')

const schema = mongoose.Schema;

const user = new schema({
    Name:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true,
        unique:true
    },
    Password:{
        type:String,
        require:true
    },
    Date:{
        type:Date,
        default:Date.now
    }
})

let userSchema = mongoose.model('User',user);
module.exports= userSchema
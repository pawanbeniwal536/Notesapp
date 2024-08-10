require('dotenv').config();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../../Schema/user')
const Folder = require('../../Schema/folder')
const Note = require('../../Schema/notes')

const Signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ Email: email });
        if (user) {
            res.status(499).send({ status: false, message: "User already exist with this mail " })
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt);

            // Create a new user
            user = await User.create({
                Name: username,
                Email: email,
                Password: secPass
            });
            const data = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, process.env.JWT_SECRET);
            res.status(200).send({ success:true,token:authtoken })
        }
        
    } catch (error) {
        res.status(500).send({ status: false, message: "Internal server errror",error })
    }
}

const Login = async(req,res) => {
    const {email,password}=req.body;
    try {
      let user = await User.findOne({ Email:email });

        if (!user) {
          success = false
          return res.status(400).json({ message : "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.Password);
        if (!passwordCompare) {
          return res.status(400).json({ success:false, message: "Please try to login with correct credentials" });
        }
    
        const data = {
          user: {
            id: user.id
          }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.status(200).send({ success, authtoken })
    
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
}

const GetUser = async(req,res) =>{
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.status(200).send({success:true,message:user})
      } catch (error) {
        console.error(error.message);
        res.status(500).send({success:false,message:"Internal Server Error"});
      }
}


const DeleteUser = async(req,res) => {
  try{

   const userId = req.params.id;
     const result = await User.findByIdAndDelete({_id:userId})
     await Folder.deleteMany({ user:userId })
     await Note.deleteMany({ user:userId })

     if(result){
       res.status(200).json({message:"Successfully deleted account ",success:true})
     }
     else{
       res.status(404).json({message:"User not found",success:false})
     }
  }

  catch(error){
   return res.status(500).json({success:false, message:"Server error in delete a account ",error})
  }
}
module.exports = { Signup,Login,GetUser,DeleteUser }
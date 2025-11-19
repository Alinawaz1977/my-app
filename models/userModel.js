import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    bio:{
        type:String,
    },
    profilePic:{
        type:String
    },
})

const userModel = mongoose.models.User || mongoose.model("User", userSchema)
export default userModel
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const userModel = mongoose.models.User || mongoose.model("User", userSchema)
export default userModel
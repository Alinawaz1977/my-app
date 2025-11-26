import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    blogId: {
        type: String,
        required: true,
    },
    date:{
        type:String,
        required:true
    }
})
const commentModel = mongoose.models.Comment || mongoose.model("Comment", commentSchema)
export default commentModel 
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    userData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        required: true,
        type: String
    },
    category: {
        type: String,
        required: true,
    },
    featuredImage: {
        type: String,
        required: true
    },
    content: {
        required: true,
        type: String,
    },
    likes: {
        type: Array,
    },
}, { minimize: false })

const blogModel = mongoose.models.blogpost || mongoose.model("blogpost", blogSchema)
export default blogModel
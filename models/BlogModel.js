import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    userid: {
        type: String
    },
    title: {
        require: true,
        type: String
    },
    cetegory: {
        require: true,
        type: String
    },
    featuredImage: {
        require: true,
        type: String
    },
    content: {
        require: true,
        type: String,
    },
    likes: {
        type: Array,
    },
}, { minimize: false })

const blogModel = mongoose.models.blogpost || mongoose.model("blogpost", blogSchema)
export default blogModel
import mongoose from "mongoose";

const connectDb = async () => {
    try {
        mongoose.connection.on("connected", function () {
            console.log("db connected");
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/blog-applicatoin`)
    } catch (error) {
        console.log(error.message);
        throw new Error("Database connection failed");
    }
}

export default connectDb

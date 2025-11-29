// import mongoose from "mongoose";

// const connectDb = async () => {
//     try {
//         mongoose.connection.on("connected", function () {
//             console.log("db connected");
//         })
//         await mongoose.connect(`${process.env.MONGODB_URI}/blog-applicatoin`)
//     } catch (error) {
//         console.log(error.message);
//         throw new Error("Database connection failed");
//     }
// }

// export default connectDb


import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
    console.log("you need to provide env of mongodburi")
}
let isConnected = false

export default async function connectDb() {
    if (isConnected) {
        console.log("db is already connected");
        return
    }
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: "blog-application-new"
        })
        isConnected = mongoose.connections[0].readyState === 1
    } catch (error) {
        console.log(error.message);

    }
}
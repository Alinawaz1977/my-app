import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/blog-applicatoin`)
    } catch (error) {
        console.log(error.message);
        throw new Error("Database connection failed");
    }
}

export default connectDb


// import mongoose from "mongoose";

// const MONGODB_URI = `${process.env.MONGODB_URI}/blog-applicatoin`;

// export const connectDb = async () => {
//   if (mongoose.connection.readyState === 1) {
//     // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
//     return;
//   }

//   try {
//     await mongoose.connect(MONGODB_URI);
//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.error("DB Error:", error.message);
//   }
// };
// export default connectDb;

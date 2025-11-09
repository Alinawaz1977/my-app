"use server"
import userModel from "@/models/userModel";

export async function userAuthActoin(formData) {
    try {
        const username = formData.get("username") && formData.get("username")
        const email = formData.get("email")
        const password = formData.get("password")
        // const user= await userModel.findOne({email})
        console.log(user);

        // console.log(username, password, email);
        if (!username) {
            // if(username){
            //     return {success:false,message:"User already exist"}
            // }
            // const newUser= await userModel.create({

            // })
            // return {success:false,message:"User already exist"}
            return ({ success: true, message: "Login" })
        }
        return ({ success: true, message: "create" })

    } catch (error) {
        return ({ success: false, message: error.message })
    }
}
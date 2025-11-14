import connectDb from "@/lib/config/db";
import userModel from "@/models/userModel";
import { createToken } from "@/utils/userToken";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(req) {
    try {
        await connectDb()
        // for create new account
        const { email, password, username } = await req.json()
        const user = await userModel.findOne({ email })
        if (user) {
            return NextResponse.json({ success: false, message: "Invalid Credentials" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log(salt);

        // const hashedPassword = await bcyrpt.hash(password, salt)
        const newUser = await userModel.create({
            email,
            password: hashedPassword,
            username,
        })
        const token = createToken(newUser._id)
        return NextResponse.json({ success: true, message:"user created successfully",token})

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

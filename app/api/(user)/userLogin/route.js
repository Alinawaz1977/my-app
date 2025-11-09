import connectDb from "@/lib/config/db";
import userModel from "@/models/userModel";
import { createToken } from "@/utils/userToken";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDb()
        // for create new account
        const { email, password } = await req.json()
        const user = await userModel.findOne({ email })
        if (!user) {
            return NextResponse({ success: false, message: "Invalid Credentials" })
        }
       const token = createToken(user._id)
        return NextResponse.json({ success: true, token })

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

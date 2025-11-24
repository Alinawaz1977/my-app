import connectDb from "@/lib/config/db";
import blogModel from "@/models/BlogModel";
import { checkUserValidation } from "@/utils/getTokenData";
import { NextResponse, userAgent } from "next/server";

export async function POST(req) {
    connectDb()
    let userValidation = await checkUserValidation(req)
    if (userValidation.error) {
        return NextResponse.json({ success: false, message: userValidation.message })
    }
    try {
        const userBlogs = await blogModel.find({ userData: userValidation.data.id }).populate("userData")
        return NextResponse.json({ success: true, userBlogs })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}
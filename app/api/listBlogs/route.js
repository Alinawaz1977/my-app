import connectDb from "@/lib/config/db";
import blogModel from "@/models/BlogModel";
import { NextResponse } from "next/server";
import userModel from "@/models/userModel";

// app/api/my-endpoint/route.js
export async function GET(request) {
    await connectDb()
    try {
        const blogLists = await blogModel.find().populate("userData")
        return NextResponse.json({ success: true, blogLists })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}
import connectDb from "@/lib/config/db";
import blogModel from "@/models/BlogModel";
import { checkUserValidation } from "@/utils/getTokenData";
import { NextResponse } from "next/server";

// app/api/my-endpoint/route.js
export async function GET(request) {
    connectDb()
    try {
        const blogLists = await blogModel.find().populate("userData") 
        return NextResponse.json({ success: true, blogLists })
    } catch (error) {
        return NextResponse.json({success:false,message:error.message})
    }
}
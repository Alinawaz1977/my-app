import connectDb from "@/lib/config/db";
import blogModel from "@/models/BlogModel";
import { checkUserValidation } from "@/utils/getTokenData";
import { NextResponse } from "next/server";


export async function POST(req) {
    connectDb()
    try {
        const { blogId } = await req.json()
        const userValidation = await checkUserValidation(req)
        if (userValidation.error) {
            return Response.json({ success: false, message: userValidation.message })
        }
        const deletedBlog = await blogModel.findOneAndDelete({ _id: blogId })
        return NextResponse.json({ success: true, message:"blog Deleted" })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}
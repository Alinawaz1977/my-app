import connectDb from "@/lib/config/db";
import commentModel from "@/models/commentModel";
import { checkUserValidation } from "@/utils/getTokenData";
import { NextResponse } from "next/server";


export async function POST(req) {
    connectDb()
    let userValidation = await checkUserValidation(req)
    if (userValidation.error) {
        return NextResponse.json({ success: false, message: userValidation.message })
    }
    try {
        const { comment, blogId } = await req.json()        
        const comments = await commentModel.create({
            comment,
            blogId,
            userId: userValidation.data.id
        })
        return NextResponse.json({ success: true, message: "successfull" })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}
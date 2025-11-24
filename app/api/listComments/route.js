import commentModel from "@/models/commentModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const allComments = await commentModel.find().populate("userId")
        return NextResponse.json({ success: true, allComments })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}
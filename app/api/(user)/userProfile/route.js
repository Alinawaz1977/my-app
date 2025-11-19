import connectDb from "@/lib/config/db";
import userModel from "@/models/userModel";
import { checkUserValidation } from "@/utils/getTokenData";
import { NextResponse } from "next/server";

export async function POST(req) {
    connectDb()
    try {
        let userValidation = await checkUserValidation(req)
        if (userValidation.error) {
            return NextResponse.json({ success: false, message: userValidation.message })
        }
        let user = await userModel.findById(userValidation.data.id)
        return NextResponse.json({ success: true, user , message:"successfull" })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}
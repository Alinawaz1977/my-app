import connectDb from "@/lib/config/db";
import blogModel from "@/models/BlogModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    connectDb()
    try {
        const allBlogs = await blogModel.find()
        let allCategories = allBlogs.distinct("category")
        return NextResponse({ success: true, allCategories })
    } catch (error) {
        return NextResponse({ success: false, message:error.message })
        
    }
}
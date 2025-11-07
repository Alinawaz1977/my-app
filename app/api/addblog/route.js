import blogModel from "@/models/BlogModel";
import { NextResponse } from "next/server";
import connectDb from "@/lib/config/db";

export async function POST(req) {
    try {
        await connectDb()
        const { title, content, featuredImage, category } = await req.json()
        const blogPost = await blogModel.create({
            title,
            content,
            featuredImage,
            category
        })
        return NextResponse.json({ success: true, blogPost })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}
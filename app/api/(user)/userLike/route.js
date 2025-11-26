import connectDb from "@/lib/config/db";
import blogModel from "@/models/BlogModel";
import { checkUserValidation } from "@/utils/getTokenData";
import { NextResponse } from "next/server";


export async function POST(req) {
    connectDb()
    const userValidation = await checkUserValidation(req)
    if (userValidation.error) {
        return NextResponse.json({ success: false, message: userValidation.message })
    }
    try {
        const { blogId } = await req.json()
        const userId = userValidation.data.id
        const blog = await blogModel.findById({ _id: blogId })
        const alreadyLiked = blog.like.includes(userId)
        if (alreadyLiked) {
            blog.like = blog.like.filter((item) => item !== userId)
        } else {
            blog.like.push(userId)
        }
        await blog.save()
        return NextResponse.json({ success: true, blog,userId, like: blog.like.length })
    } catch (error) {
        return NextResponse.json({ success: false,message: error.message })
    }
}
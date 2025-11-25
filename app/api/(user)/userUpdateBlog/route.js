import connectCloudinary from "@/lib/config/cloudinary";
import connectDb from "@/lib/config/db";
import { checkUserValidation } from "@/utils/getTokenData";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary"
import blogModel from "@/models/BlogModel";


export async function POST(req) {
    connectDb()
    connectCloudinary()
    const userValidation = await checkUserValidation(req)
    if (userValidation.error) {
        return NextResponse.json({ success: false, message: userValidation.message })
    }
    try {
        const formData = await req.formData()
        const featuredImage = formData.get("featuredImage")
        const title = formData.get("title")
        const content = formData.get("content")
        const category = formData.get('category')
        const blogId = formData.get('blogId')

        if (featuredImage) {
            const bufferArray = await featuredImage.arrayBuffer()
            const buffer = Buffer.from(bufferArray)
            const base64String = buffer.toString("base64")
            const uploadUrl = `data:${featuredImage.type};base64,${base64String}`
            var cloudinaryUrl = await cloudinary.uploader.upload(uploadUrl, { resource_type: "image" })
            console.log(cloudinaryUrl.secure_url);

        }
        const blog = await blogModel.findOne({_id:blogId})
        if (featuredImage) {
            blog.featuredImage = cloudinaryUrl.secure_url
        }
        blog.content = content
        blog.title = title
        blog.category = category
        await blog.save()

        return NextResponse.json({ success: true, blog })

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}
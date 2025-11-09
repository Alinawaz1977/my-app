"use server";
import { v2 as cloudinary } from "cloudinary"
import connectCloudinary from "@/lib/config/cloudinary";
import connectDb from "@/lib/config/db";
import blogModel from "@/models/BlogModel";
import { NextResponse } from "next/server";

export async function onBlogActionSubmit(formData) {
    try {
        connectCloudinary()
        connectDb()
        const featuredImage = formData.get("featuredImage");
        const title = formData.get("title");
        const category = formData.get("category");
        const content = formData.get("content");
        console.log(featuredImage, content, category, title);
        // Validate
        // if (!file || file.size === 0) {
        //     return { success: false, message: "No file uploaded" };
        // }
        // Convert file to Buffer
        const bytes = await featuredImage.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64File = `data:${featuredImage.type};base64,${buffer.toString("base64")}`;
        const cloudinaryUrl = await cloudinary.uploader.upload(base64File, { resource_type: "image" })
        // console.log(cloudinaryUrl.secure_url);

        const blogPost = await blogModel.create({
            title,
            category,
            content,
            featuredImage: cloudinaryUrl.secure_url
        })

        return NextResponse.json({ success: true, message: "Blog uploaded successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import connectCloudinary from "@/lib/config/cloudinary";
import { v2 as cloudinary } from "cloudinary";
import blogModel from "@/models/BlogModel";
import connectDb from "@/lib/config/db";

export async function POST(req) {
    try {
        connectCloudinary();
        connectDb()
        const formData = await req.formData();
        const file = formData.get("featuredImage");
        const title = formData.get("title")
        const content = formData.get("content")
        const category = formData.get("category")

        if (!file) throw new Error("No file uploaded");


        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        // const base64String = buffer.toString("base64");
        const base64String = buffer.toString("base64")
        // console.log(base64String);
        const uploadUrl = `data:${file.type};base64,${base64String}`
        const cloudinaryUrl = await cloudinary.uploader.upload(uploadUrl, { resource_type: "image" })
        // console.log(cloudinaryUrl.secure_url);
        const blogPost = await blogModel.create({
            title,
            content,
            category,
            featuredImage: cloudinaryUrl.secure_url
        })

        return NextResponse.json({
            success: true,
            message: "File uploaded successfully",
            // imageUrl: cloudinaryRes.secure_url,
            blogModel
        });
    } catch (error) {
        console.error("File upload error:", error);
        return NextResponse.json({ success: false, message: error.message });
    }
}

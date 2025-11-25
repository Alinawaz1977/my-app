import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import connectCloudinary from "@/lib/config/cloudinary";
import { v2 as cloudinary } from "cloudinary";
import blogModel from "@/models/BlogModel";
import connectDb from "@/lib/config/db";
import { checkUserValidation, getTokenData } from "@/utils/getTokenData";
import { error } from "console";
import userModel from "@/models/userModel";
import { use } from "react";

export async function POST(req) {
    try {
        connectCloudinary();
        connectDb()
        const userValidation = await checkUserValidation(req)
        if (userValidation.error) {
            return NextResponse.json({ success: false, message: userValidation.message })
        }
        const userdata = await userModel.findById(userValidation.data.id)
        // console.log(userdata);

        const formData = await req.formData();
        const file = formData.get("featuredImage");
        const title = formData.get("title");
        const content = formData.get("content");
        const category = formData.get("category");

        
        if (!file) throw new Error("No file uploaded");
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64String = buffer.toString("base64")
        const uploadUrl = `data:${file.type};base64,${base64String}`
        const cloudinaryUrl = await cloudinary.uploader.upload(uploadUrl, { resource_type: "image" })
        // console.log(cloudinaryUrl.secure_url);
        const blogPost = await blogModel.create({
            // userData:userdata.toObject(),
            userData: userValidation.data.id,
            content,
            title,
            category,
            featuredImage: cloudinaryUrl.secure_url
        })

        return NextResponse.json({
            success: true,
            message: "Blog Uploaded Successfully",
            blogPost
        });
    } catch (error) {
        console.error("File upload error:", error);
        return NextResponse.json({ success: false, message: error.message });
    }
}

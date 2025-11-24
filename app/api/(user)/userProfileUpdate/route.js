
import connectCloudinary from "@/lib/config/cloudinary";
import connectDb from "@/lib/config/db";
import userModel from "@/models/userModel";
import { checkUserValidation } from "@/utils/getTokenData";
import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from "next/server";

export async function POST(req) {
    connectDb()
    connectCloudinary()
    let userValidation = await checkUserValidation(req)
    if (userValidation.error) {
        return NextResponse.json({ success: false, message: "unauthorized" })
    }
    try {
        const formData = await req.formData()
        const username = formData.get("username")
        const email = formData.get("email")
        const bio = formData.get("bio")
        let profilePicUrl = null
        const profilePic = formData.get("profilePic")
        console.log(profilePic);
        if (profilePic && profilePic.size > 0) {
            const arrayBuffer = await profilePic.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64String = buffer.toString("base64");
            const uploadUrl = `data:${profilePic.type};base64,${base64String}`;
            const uploaded = await cloudinary.uploader.upload(uploadUrl, {
                resource_type: "image",
            });

            profilePicUrl = uploaded.secure_url;
        }

        const user = await userModel.findById(userValidation.data.id);

        user.username = username;
        user.email = email;
        user.bio = bio;

        if (profilePicUrl) {
            user.profilePic = profilePicUrl;  // update only if image provided
        }

        user.bio = bio
        user.email = email
        user.username = username
        user.save()
        return NextResponse.json({ success: true, user, message: "Profile Updated Successfully" })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })

    }
}
"use server"
import connectCloudinary from "@/lib/config/cloudinary";
import connectDb from "@/lib/config/db";
// import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from "next/server";

export async function POST(req) {
    connectDb()
    // connectCloudinary()
    try {
        const formdata = await req.formdata()
        const username = formdata.get("username")
        const email = formdata.get("email")
        const bio = formdata.get("bio")
        const profilePic = formdata.get("profilePic")
        console.log(username,email,bio,profilePic)
        // return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ success: false })
        
    }
}
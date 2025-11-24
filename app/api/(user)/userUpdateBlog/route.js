import connectDb from "@/lib/config/db";
import { createFetch } from "next/dist/client/components/router-reducer/fetch-server-response";
import { NextResponse } from "next/server";


export async function POST(req) {
    connectDb()
    try {
        const { featuredImage, title, content, category } = await req.json()
        console.log(featuredImage, title, content, category);
        return NextResponse.json({ success: true, content, title, category })

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })

    }
}
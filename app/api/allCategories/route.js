import connectDb from "@/lib/config/db";
import blogModel from "@/models/BlogModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    connectDb();

    try {
        // Get all categories directly using distinct()
        const allCategories = await blogModel.distinct("category");

        return NextResponse.json({
            success: true,
            categories: allCategories
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}

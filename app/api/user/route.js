import connectDb from "@/lib/config/db";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDb()
    const { email, password } = await req.json()
    const user = await userModel.create({
      email,
      password
    })
    return NextResponse.json({ success: true, user })
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

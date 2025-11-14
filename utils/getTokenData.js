import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

export async function getTokenData(req) {
    try {
        const token = req.headers.get("token")
        if (!token) {
            return NextResponse.json({ sucess: false, message: "Unauthorized" })
        }
        const decode = jwt.verify(token, process.env.SECRET)
        return decode
    } catch (error) {
        return NextResponse.json({ sucess: false, message: error.message })
    }
}

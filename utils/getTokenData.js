import { error } from "console"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

export async function checkUserValidation(req) {    
    try {
        const token = req.headers.get("token")
        if (!token) {
            return { error: true, message: "Unauthorized" }
        }
        const decode = jwt.verify(token, process.env.SECRET)
        return {error:false,data:decode}
    } catch (error) {
        return { error: true, message: error.message }
    }
}

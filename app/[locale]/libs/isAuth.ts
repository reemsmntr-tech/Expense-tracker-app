import * as jose from "jose"
import { NextRequest } from "next/server"

export default async function isAuthenticated(request: NextRequest){
    const authenticatedHeaders = request.headers.get("authorization")
    if(!authenticatedHeaders || !authenticatedHeaders.startsWith("Bearer ")){
        return false
    }

    const token = authenticatedHeaders.replace("Bearer ", "")
    const JWT_SECRET = process.env.JWT_SECRET as string

    try{
        const {payload} = await jose.jwtVerify(
            token,
            new TextEncoder().encode(JWT_SECRET)
        );
        const userId = payload.userId as string

        return userId


    }catch(error){
        return false

    }
}
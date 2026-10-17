import bcrypt from "bcryptjs";
import User from "@/app/models/User";
import createToken from "@/app/[locale]/libs/createToken";
import connectDB  from "../../../../lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

interface Body {
    email: string ,
    password: string ,
    confirmPassword?:string,
    username: string
}

export async function POST (request: NextRequest){
    try{
        await connectDB();
    
    const body: Body = await request.json()

    if(body.password !== body.confirmPassword){
        return NextResponse.json(
            {message: "Password does not match"},
            {status: 400}
        );
    };
    delete body.confirmPassword ;

    const hashedPassword = await bcrypt.hash(body.password, 8)
    const user = await User.create({ ...body, password: hashedPassword })


    const token = await createToken(user._id.toString())

    return NextResponse.json({ user, token })


    }catch(error: any){
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


     

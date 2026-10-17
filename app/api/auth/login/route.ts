import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../models/User"
import createToken  from "@/app/[locale]/libs/createToken";
import connectDB from "@/lib/connectDB";


interface Body {
    email: string ,
    password: string ,
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { email, password } : Body = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json({ message: "Password is incorrect" }, { status: 400 });
    }

    const token = await createToken(user._id.toString());
    const { password: _pw, ...safeUser } = user.toObject();

    return NextResponse.json({ user: safeUser, token });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}



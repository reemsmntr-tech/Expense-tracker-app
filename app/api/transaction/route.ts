import { NextResponse, NextRequest } from "next/server";
import connectDB from "../../../lib/connectDB";
import Transaction from "@/app/models/Transaction";
import { getUserId } from "../../../lib/getUserId";



interface Body {
  amount: number;
  name: string;
  startDate: Date;
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();
    const transactions = await Transaction.find({ userId });
    return NextResponse.json(transactions);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { name, amount, startDate }: Body = await request.json();
    const transaction = await Transaction.create({ name, amount, startDate, userId });
    return NextResponse.json(transaction);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();
    await Transaction.deleteMany({ userId });
    return NextResponse.json({ message: "Deleted all transactions successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
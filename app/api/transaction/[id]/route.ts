import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "../../../../lib/connectDB";
import Transaction from "@/app/models/Transaction";
import { getUserId } from "../../../../lib/getUserId";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Ctx) {
  try {
    const userId = await getUserId(request);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const transaction = await Transaction.findOne({ _id: id, userId });
    if (!transaction) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }
    return NextResponse.json(transaction);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Ctx) {
  try {
    const userId = await getUserId(request);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const { amount, name, startDate } = await request.json();
    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, userId },
      { amount, name, startDate },
      { new: true }
    );
    if (!transaction) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }
    return NextResponse.json(transaction);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  try {
    const userId = await getUserId(request);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const deleted = await Transaction.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted transaction successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
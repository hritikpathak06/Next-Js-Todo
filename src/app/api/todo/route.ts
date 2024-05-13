import { connectToDatabase } from "@/library/connection";
import Todo from "@/library/models/todoModel";
import { NextRequest, NextResponse } from "next/server";

connectToDatabase();

export async function POST(req: NextRequest) {
  try {
    const { text, postedBy } = await req.json();
    const todo = new Todo({
      text,
      postedBy,
    });
    await todo.save();
    return NextResponse.json({
      success: true,
      todo,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: true,
        message: error.message,
      },
      { status: 200 }
    );
  }
}


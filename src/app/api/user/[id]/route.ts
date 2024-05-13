import { connectToDatabase } from "@/library/connection";
import Todo from "@/library/models/todoModel";
import { NextRequest, NextResponse } from "next/server";

connectToDatabase();

export async function GET(req: NextRequest, content: any) {
  try {
    const { id } = await content.params;
    const todoItem = await Todo.find({ postedBy: id }).sort({createdAt:-1});
    return NextResponse.json({
      success: true,
      id,
      todoItem,
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




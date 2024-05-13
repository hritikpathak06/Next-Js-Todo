import { connectToDatabase } from "@/library/connection";
import Todo from "@/library/models/todoModel";
import { NextRequest, NextResponse } from "next/server";

connectToDatabase();

export async function GET(req: NextRequest, content: any) {
  try {
    const { id } = await content.params;
    const { searchParams } = new URL(req.url);

    const searchText = searchParams.get("task");

    if (searchText) {
      const todoItem = await Todo.find({
        postedBy: id,
        text: { $regex: `${searchText}`, $options: "i" },
      });
      return NextResponse.json({
        success: true,
        todoItem,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Nothing Found",
      });
    }
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

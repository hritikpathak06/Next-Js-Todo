import Todo from "@/library/models/todoModel";
import { NextRequest, NextResponse } from "next/server";

// API To Delete the todo task
export async function DELETE(req: NextRequest, content: any) {
  try {
    const { id } = await content.params;
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "task Deleted successfully",
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


// API To Update The todo Task
export async function PUT(req: NextRequest, content: any) {
  try {
    const { id } = await content.params;
    const { text } = await req.json();
    const task = await Todo.findById(id);
    task.text = text || task.text;
    await task.save();
    return NextResponse.json({
      success: true,
      message: "Task Updated Successfully",
      text,
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

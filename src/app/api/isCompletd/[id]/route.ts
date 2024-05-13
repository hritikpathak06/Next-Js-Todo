import Todo from "@/library/models/todoModel";
import { Truculenta } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, content: any) {
  try {
    const { id } = await content.params;
    const task = await Todo.findById(id);
    if (!task) {
      throw new Error("No Task Found");
    }
    task.isCompleted = true;
    await task.save();
    return NextResponse.json({
      success: true,
      message: "Task Completed Successfully",
      task,
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

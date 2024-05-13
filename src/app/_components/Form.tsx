"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Form = ({ user, tasks, setTasks }: any) => {
  const [text, setText] = useState<string>("");

  // Function For Creating the task
  const createTask = async (e: any) => {
    e.preventDefault();
    if (text.trim() === "") {
      return toast.error("Please Add Todo Task");
    }
    try {
      const { data } = await axios.post("/api/todo", {
        text,
        postedBy: user._id,
      });
      setTasks([...tasks, data.todo]);
      toast.success("New Task Created");
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full mb-4">
        <form onSubmit={createTask} className=" flex items-center  ">
          <Input
            type="text"
            placeholder="Enter Todo"
            className="focus:outline-none h-[5vh] border-r-0 form outline-none"
            style={{ outline: "none" }}
            value={text}
            onChange={(e: any) => setText(e.target.value)}
          />
          <Button type="submit" className=" w-[30%] h-[5vh]">
            Add
          </Button>
        </form>
      </div>
    </>
  );
};

export default Form;

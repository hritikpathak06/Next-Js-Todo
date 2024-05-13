import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateTask = ({ id, text, tasks, setTasks }: any) => {
  const [textVal, setTextVal] = useState<any>(text);
  const [isOpnen, setIsOpen] = useState<boolean>(true);

  // Function To Update The Task
  const handleUpdateTask = async (id: any) => {
    const { data } = await axios.put(`/api/todo/${id}`, {
      text: textVal,
    });
    toast.success("Task Updated Successfully");
    setTasks(
      tasks.map((task: any) =>
        task._id === id ? { ...task, text: data.text } : task
      )
    );
  };

  return (
    <>
      {isOpnen && (
        <Dialog>
          <DialogTrigger>
            <Button className=" bg-transparent">Update</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <form action="">
                  <Input
                    value={textVal}
                    onChange={(e) => setTextVal(e.target.value)}
                  />
                </form>
              </DialogTitle>
              <DialogDescription>
                <Button
                className=" w-full"
                  onClick={() => {
                    handleUpdateTask(id);
                  }}
                >
                  Update
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default UpdateTask;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UpdateTask from "./UpdateTask";
import SearchForm from "./SearchForm";

const GetMyTasks = ({ user,  tasks, setTasks }: any) => {
  const [inputText, setInputText] = useState<any>("");

  // Function For Getting all my tasks
  const getMyTasks = async () => {
    let url = `/api/user/${user?._id}`;
    if (inputText.trim() !== "") {
      url = `/api/filter/search/${user?._id}?task=${inputText}`;
    }
    try {
      const { data } = await axios.get(url);
      setTasks(data.todoItem);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Function For Deleting the task
  const handleDeleteTask = async (id: any) => {
    const { data } = await axios.delete(`/api/todo/${id}`);
    if (data.success) {
      toast.success("Task Deleted Successfully");
      setTasks(tasks.filter((task: any) => task._id !== id));
    }
  };

  // Function For Completing Task
  const handleCompleteTask = async (id: any) => {
    console.log("Id: ", id);
    const { data } = await axios.put(`/api/isCompletd/${id}`);
    if (data.success) {
      toast.success("Task Completed");
      setTasks(
        tasks.map((task: any) =>
          task._id === id ? { ...task, isCompleted: true } : task
        )
      );
    }
  };

  useEffect(() => {
    const debounceFn = setTimeout(() => {
      getMyTasks();
    }, 1000);
    return () => clearTimeout(debounceFn);
  }, [user?._id, inputText]);

  return (
    <>
        <div>
          <SearchForm
            searchText={getMyTasks}
            inputText={inputText}
            setInputText={setInputText}
          />
          {tasks &&
            tasks.map(({ text, isCompleted, _id }: any, index: number) => (
              <div
                className=" w-full bg-blue-500 p-2 flex items-center mt-4 gap-4"
                key={index}
              >
                <div className="md:w-[10%]">
                  {isCompleted ? (
                    <span className=" text-white font-bold">✔️</span>
                  ) : (
                    <Input
                      type="checkbox"
                      className=" w-[30px] cursor-pointer"
                      onClick={() => handleCompleteTask(_id)}
                    />
                  )}
                </div>
                <div
                  className={`w-[80%] ${isCompleted ? " line-through" : null}`}
                >
                  {text}
                </div>
                <div className=" w-[20%] flex items-center justify-end">
                  <UpdateTask
                    id={_id}
                    text={text}
                    tasks={tasks}
                    setTasks={setTasks}
                  />
                  <Button
                    className=" bg-transparent"
                    onClick={() => handleDeleteTask(_id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
        </div>
    </>
  );
};

export default GetMyTasks;

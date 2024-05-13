"use client";
import { useEffect, useState } from "react";
import Form from "./_components/Form";
import GetMyTasks from "./_components/GetMyTasks";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export interface Task {
  _id: string;
  text: string;
  isCompleted: boolean;
  postedBy: string;
}

export default function Home() {
  const [user, setUser] = useState<any>();
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleLogout = async () => {
    localStorage.removeItem("user") as any;
    setUser(null);
    await toast.success("Logged Out");
    window.location.reload();
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user") as any);
    setUser(data);
    if (!data) {
      redirect("/login");
    }
  }, []);

  return (
    <>
      <div className=" h-[100vh] w-full">
        <div className=" absolute top-0 right-0 border-r-[50%] p-3 ">
          <button
            className=" bg-black p-2"
            style={{ borderRadius: "50%" }}
            onClick={handleLogout}
          >
            🌬️
          </button>
        </div>
        <div className=" pt-10 w-full">
          <h1 className=" text-center text-3xl font-[900] pb-4 uppercase">
            Todo List
          </h1>
          <div className=" md:w-[50%] w-[90%] m-auto  pt-11 md:pt-0">
            <Form user={user} tasks={tasks} setTasks={setTasks} />

            <div>
              <GetMyTasks user={user} tasks={tasks} setTasks={setTasks} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

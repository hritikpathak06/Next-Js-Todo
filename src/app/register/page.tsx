"use client";
import { signup } from "@/actions/register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const RegisterPage = () => {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user") as any);
    setUser(data);
  }, []);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <>
      <div className="h-[100vh] w-full flex items-center justify-center">
        <div className=" md:w-[40%] w-[100%] flex flex-col items-center border p-10">
          <h1 className=" text-center text-2xl font-extrabold pb-3">
            Register Page
          </h1>
          <form action={signup} className=" md:w-[70%] w-[90%] flex flex-col gap-4">
            <Input type="text" placeholder="Enter Your Name" name="name" />
            <Input type="email" placeholder="Enter Your Email" name="email" />
            <Input
              type="password"
              placeholder="Enter Your Password"
              name="password"
            />
            <Button type="submit">Register</Button>
            <p>
              Aready have an account ?{" "}
              <span>
                <Link href={"/login"} className=" text-blue-300">login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

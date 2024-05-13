"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("singh@gmail.com");
  const [password, setPassword] = useState("12345");
  const router = useRouter();
  const [user, setUser] = useState();
  const[loading,setLoading] = useState<boolean>(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user") as any);
    setUser(data);
  }, []);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  // Function For Login
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/login", {
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.reload();
        setLoading(false);
      }
    } catch (error: any) {
      toast.error("Inavlid Email or Password");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-[100vh]  w-full flex items-center justify-center">
        <div className=" md:w-[40%] w-[100%] flex flex-col items-center border p-10">
          <h1 className=" text-center text-2xl font-extrabold pb-3">Login</h1>
          <form
            onSubmit={handleSubmit}
            className=" md:w-[70%] w-[90%] flex flex-col gap-4"
          >
            <Input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>{loading ? "Loading" : "Login"}</Button>
            <p>
              Dont have an account ?{" "}
              <span>
                <Link href={"/register"} className=" text-blue-300">
                  register
                </Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

"use client"

import { useAuth } from "@/providers/AuthProvider";
import { redirect } from "next/navigation";

const Page = () => {

  const { user } = useAuth()
  if (!user._id) redirect("/login")

  return <div></div>;
};

export default Page;

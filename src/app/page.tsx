"use client";

import Navbar from "@/components/custom/Navbar";
import ImageTable from "@/components/custom/ImageTable";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";

const Page = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user.token) router.replace("/login");
  }, [user.token, router])
  
  if (!user.token) return null

  return (
    <div>
      <Navbar />
      <ImageTable />
    </div>
  );
};

export default Page;

"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import LoginCard from "@/components/custom/LoginCard";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user.token) router.replace("/");
  }, [user.token, router])
  
  if (user.token) return null

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <LoginCard />
    </div>
  );
};

export default Page;

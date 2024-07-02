"use client";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import React from "react";
import { signOut } from "next-auth/react";



const Home = ({ session }: { session: Session }) => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };
  const data = session["user"];


  return (
    <div>
      Logged in
      <div>{session.user?.id}</div>
      <Button onClick={handleSignOut}>sign out</Button>
    </div>
  );
};

export default Home;
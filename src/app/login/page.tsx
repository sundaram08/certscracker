import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const Page = async () => {

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen">
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 h-full bg-purple-600 text-white p-8">
        <h1 className="text-4xl font-bold mb-4">Certs-Cracker</h1>
        <p className="text-lg">Practice, Prepare, Prevail - Certs Cracker is Your Study Partner.</p>
        <div className="mt-8">
          <img src="/path-to-your-image.png" alt="Study Illustration" className="w-3/4"/>
        </div>
      </div>
      <div className="flex justify-center items-center w-full md:w-1/2 h-full">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <LoginForm />
          <div className="mt-4 text-center">
            <Link href="/signup">
              <p className="text-indigo-600 hover:text-indigo-800">New User? Sign Up</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

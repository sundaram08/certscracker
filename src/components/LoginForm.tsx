"use client";
import { CredentialsLogin } from "@/action/login";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const LoginForm = () => {
  const router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const error = await CredentialsLogin(username, password);
      if (!error) {
        toast.success("Login successful");
        router.push("/home");
      } else {
        toast.error("Invalid Username or Password");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    // <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    //   <Input name="username" type="text" placeholder="Username" />
    //   <Input name="password" type="password" placeholder="Password" />
    //   <Button type="submit">Login</Button>
    // </form>
    <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Username</label>
      <input type="text" id="fullName" name="username" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
      <input type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>
    <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Login</button>
  </form>
  );
};

export default LoginForm;

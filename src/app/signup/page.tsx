import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import Link from "next/link";
  import User from "@/models/userModel";
  import { hash } from "bcryptjs";
  import { redirect } from "next/navigation";
  import { connectDB } from "@/lib/utils";
  
  const Signup = () => {
    const signup = async (formData: FormData) => {
      "use server";
      // console.log("executing");
  
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
  
      if (!email || !password || !name) throw new Error("Please fill details");
  
      await connectDB();
  
      const user = await User.findOne({ email });
  
      if (user) throw new Error("User already exists");
  
      const hashedPass = await hash(password, 10);
      const newUser = User.create({
        username: name,
        email: email,
        password: hashedPass,
      });
      redirect("/login");
    };
    return (
      <div className="flex justify-center items-center h-dvh">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
          <form action={signup} className="space-y-4">
    <div>
      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
      <input type="text" id="fullName" name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
      <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
      <input type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>
    <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Create Account</button>
  </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Link href="/login">Already have an account? Login</Link>
          </CardFooter>
        </Card>
      </div>
    );
  };
  
  export default Signup;
  
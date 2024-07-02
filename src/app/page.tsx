import { auth } from "@/auth";
import Home from "./Home";
import Link from "next/link";

const Page = async () => {
  return<>
 <div className="bg-purple-500 h-screen w-screen flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl mb-4">Welcome to Our Landing Page</h1>
        <Link href="/login" className="text-lg">Please log in to continue</Link>
      </div>
    </div>
  </>

};

export default Page;

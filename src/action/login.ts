"use server";
import { signIn } from "@/auth";
import { SignInResponse } from "next-auth/react";

const CredentialsLogin = async (
  username: string,
  password: string
): Promise<string | null> => {
  try {
    const result: SignInResponse = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      console.log(result.error);
      return result.error;
    }
    
    return null;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return "An unexpected error occurred";
  }
};

export { CredentialsLogin };

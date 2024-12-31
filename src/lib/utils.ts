import { IPassword } from "@/models/password.model";
import { ErrorResponse } from "@/types/global";
import { signIn, signOut } from "@/auth";

export const isErrorResponse = <T>(
  data: T | ErrorResponse
): data is ErrorResponse => {
  return (data as ErrorResponse).message != undefined;
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

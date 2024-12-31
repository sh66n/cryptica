import Image from "next/image";
import Link from "next/link";
import GithubLogin from "@/components/GithubLogin";
import { handleGithubLogin } from "@/lib/utils";

const Login = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-orange-400 to-orange-600 flex">
      <div className="h-screen w-fit flex flex-col mr-32">
        <div className="font-libre-barcode text-white text-9xl relative left-20 top-32">
          <Link href={"/"}>CRYPTICA</Link>
        </div>
        <div className="mt-auto relative right-14 bottom-8">
          <Image
            src={"/login.svg"}
            width={500}
            height={500}
            alt="Login Image"
          />
        </div>
      </div>
      <div className="h-screen w-full  flex justify-center items-center bg-white">
        <div className="bg-gray-300 p-4 rounded-lg">
          <div className="text-3xl text-orange-600 my-4">
            Have an account? Sign in.
          </div>
          <GithubLogin handleLogin={handleGithubLogin} />
        </div>
      </div>
    </div>
  );
};

export default Login;

"use client";
import Image from "next/image";
import { useAuth } from "@/components/auth/AuthContext";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_AUTH_URL}/google`;
  };

  return (
    <div className="flex flex-col grow justify-center items-center">
      <div className="px-6 py-4 rounded-lg bg-gray-100 h-fit w-fit">
        <h1 className="text-4xl my-4 font-bold">Welcome!</h1>
        <button
          onClick={handleGoogleLogin}
          className="flex bg-white p-4 rounded-md font-semibold items-center gap-2"
        >
          Log in with Google
          <FcGoogle size={25} />
        </button>

        {/*<button onClick={logout} className="bg-red-400 p-4 m-2 rounded-md">*/}
        {/*  Log out*/}
        {/*</button>*/}

        {/*{user && (*/}
        {/*  <>*/}
        {/*    <h2>Welcome, {user.user_name}!</h2>*/}
        {/*    <h2>Email: {user.user_email}</h2>*/}
        {/*    <Image*/}
        {/*      src={user.picture}*/}
        {/*      width={200}*/}
        {/*      height={200}*/}
        {/*      alt="User Picture"*/}
        {/*    />*/}
        {/*  </>*/}
        {/*)}*/}
      </div>
    </div>
  );
}

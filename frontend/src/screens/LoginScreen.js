import React from "react";
import { Link } from "react-router-dom";

export default function LoginScreen() {
  return (
    <div className="mt-20 mb-4 border-2 px-8 pb-8 rounded-md shadow-lg max-w-sm mx-auto">
      <div className="font-bold text-2xl w-fit mx-auto my-6">Log In</div>
      <form action="">
        <input type="email" name="email" id="signUp_email" className="w-full mb-4 rounded-sm bg-slate-100 border-2 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" placeholder="Enter email" />
        <input type="password" name="password" id="signUp_password" className="w-full mb-4 rounded-sm bg-slate-100 border-2 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" placeholder="Enter password" />
        <input type="submit" value="Login" className="w-full h-8 cursor-pointer rounded-md bg-green-500 text-white hover:bg-green-600" />
      </form>
      <div className="mx-auto my-2 text-sm w-fit">
        Don't have an account?{" "}
        <Link to="/register" className="hover:text-orange-600 underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

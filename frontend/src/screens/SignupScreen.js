import React from "react";
import { Link } from "react-router-dom";

export default function SignupScreen() {
  return (
    <div className="mt-20 mb-4 border-2 px-8 pb-8 rounded-md shadow-lg max-w-sm mx-auto">
      <div className="font-bold text-2xl w-fit mx-auto my-6">Sign Up</div>
      <form action="">
        <input type="text" name="name" id="signUp_name" className="w-full mb-4 rounded-sm bg-slate-100 border-2 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" placeholder="Enter name" />
        <input type="email" name="email" id="signUp_email" className="w-full mb-4 rounded-sm bg-slate-100 border-2 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" placeholder="Enter email" />
        <input type="password" name="password_1" id="signUp_password_1" className="w-full mb-4 rounded-sm bg-slate-100 border-2 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" placeholder="Enter password" />
        <input type="password" name="password_2" id="signUp_password_2" className="w-full mb-4 rounded-sm bg-slate-100 border-2 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" placeholder="Repeat password" />
        <textarea name="address" id="signUp_address" className="w-full h-20 mb-4 rounded-sm bg-slate-100 border-2 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" placeholder="Enter Address" />
        <input type="submit" value="Submit" className="w-full h-8 cursor-pointer rounded-md bg-green-500 text-white hover:bg-green-600" />
      </form>
      <div className="mx-auto my-2 text-sm w-fit">
        Already have an account?{" "}
        <Link to="/login" className="hover:text-orange-600 underline">
          Login
        </Link>
      </div>
    </div>
  );
}

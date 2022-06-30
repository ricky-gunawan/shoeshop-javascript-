import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../features/user/userInfoSlice";

export default function LoginScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(null);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarning(null);
    try {
      const resp = await axios.post("/api/user/login", { email, password });
      dispatch(setUserInfo(resp.data));
      window.location.assign("/");
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 404) {
        setWarning("Email or Password wrong");
      }
    }
  };
  return (
    <div className="mt-20 mb-4 border-2 px-8 pb-8 rounded-md shadow-lg max-w-sm mx-auto">
      <div className="font-bold text-2xl w-fit mx-auto my-6">Log In</div>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={handleEmail} type="email" name="email" id="signUp_email" className="w-full mb-4 rounded-sm bg-slate-100 border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" placeholder="Enter email" />
        <input
          value={password}
          onChange={handlePassword}
          type="password"
          name="password"
          id="signUp_password"
          className="w-full mb-4 rounded-sm bg-slate-100 border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
          placeholder="Enter password"
        />
        {warning ? <div className="mx-auto -mt-2 mb-4 text-red-500 text-sm w-fit">{warning}</div> : ""}
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

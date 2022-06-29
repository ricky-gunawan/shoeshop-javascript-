import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignupScreen() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password_1, setPassword_1] = useState("");
  const [password_2, setPassword_2] = useState("");
  const [address, setAddress] = useState("");
  const [passwordWarning, setPasswordWarning] = useState(null);
  const [emailWarning, setEmailWarning] = useState(null);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword_1 = (e) => {
    setPassword_1(e.target.value);
  };
  const handlePassword_2 = (e) => {
    setPassword_2(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    setPasswordWarning(null);
    setEmailWarning(null);
    e.preventDefault();
    if (name && email && address && password_1 === password_2) {
      try {
        await axios.post("/api/user/register", { name, email, password: password_1, address });
        alert("account created");
        navigate("/login");
      } catch (error) {
        if (error.response.status === 400) {
          setEmailWarning("The email already used, use another email");
        } else if (error.response.status === 500) {
          alert("server error, try again later");
        } else {
          alert("error, try again later");
        }
      }
    } else {
      setPasswordWarning("Make sure the passwords are match!");
    }
  };

  return (
    <div className="mt-20 mb-4 border-2 px-8 pb-8 rounded-md shadow-lg max-w-sm mx-auto">
      <div className="font-bold text-2xl w-fit mx-auto my-6">Sign Up</div>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={handleName}
          type="text"
          name="name"
          id="signUp_name"
          className="w-full mb-4 rounded-sm bg-slate-100 border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
          placeholder="Enter name"
          required
        />
        <input
          value={email}
          onChange={handleEmail}
          type="email"
          name="email"
          id="signUp_email"
          className="w-full mb-4 rounded-sm bg-slate-100 border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
          placeholder="Enter email"
          required
        />
        {emailWarning ? <div className="mx-auto -mt-2 mb-4 text-red-500 text-sm w-fit">{emailWarning}</div> : ""}
        <input
          value={password_1}
          onChange={handlePassword_1}
          type="password"
          name="password_1"
          id="signUp_password_1"
          className="w-full mb-4 rounded-sm bg-slate-100 border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
          placeholder="Enter password"
          required
        />
        <input
          value={password_2}
          onChange={handlePassword_2}
          type="password"
          name="password_2"
          id="signUp_password_2"
          className="w-full mb-4 rounded-sm bg-slate-100 border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
          placeholder="Repeat password"
          required
        />
        {passwordWarning ? <div className="mx-auto -mt-2 mb-4 text-red-500 text-sm w-fit">{passwordWarning}</div> : ""}
        <textarea
          value={address}
          onChange={handleAddress}
          name="address"
          id="signUp_address"
          className="w-full h-20 mb-4 rounded-sm bg-slate-100 border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
          placeholder="Enter Address"
          required
        />
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
